/**
 * Project Sharing Manager
 * Handles project sharing, permissions, and collaboration
 */

import EventEmitter from 'events';
import {
  ProjectId,
  UserId,
  TeamId,
  ShareId,
  ShareLink,
  ShareRequest,
  ShareInvitation,
  CollaboratorAccess,
  ProjectRole,
  ProjectPermission,
  User,
} from '@brepflow/cloud-api/src/types';

export interface SharingConfig {
  apiEndpoint: string;
  maxSharesPerProject: number;
  defaultLinkExpiration: number; // days
  allowAnonymousAccess: boolean;
  requireEmailVerification: boolean;
}

export interface ShareAnalytics {
  shareId: ShareId;
  totalAccesses: number;
  uniqueUsers: number;
  lastAccessed: Date;
  accessHistory: ShareAccess[];
}

export interface ShareAccess {
  userId?: UserId;
  email?: string;
  accessedAt: Date;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
  };
}

export class ProjectSharingManager extends EventEmitter {
  private config: SharingConfig;
  private shareCache = new Map<ShareId, ShareLink>();
  private invitationCache = new Map<string, ShareInvitation>();

  constructor(config: SharingConfig) {
    super();
    this.config = config;
  }

  /**
   * Create a shareable link for a project
   */
  async createShareLink(
    projectId: ProjectId,
    createdBy: UserId,
    options: {
      accessLevel?: ProjectRole;
      expiresAt?: Date;
      isPublic?: boolean;
      allowAnonymous?: boolean;
      maxUses?: number;
      description?: string;
    } = {}
  ): Promise<ShareLink> {
    try {
      // Validate permissions
      await this.validateUserPermission(createdBy, projectId, 'share');

      const shareLink: ShareLink = {
        id: this.generateShareId(),
        projectId,
        createdBy,
        createdAt: new Date(),
        expiresAt: options.expiresAt || this.getDefaultExpiration(),
        accessLevel: options.accessLevel || 'viewer',
        isPublic: options.isPublic || false,
        allowAnonymous: options.allowAnonymous || this.config.allowAnonymousAccess,
        maxUses: options.maxUses,
        currentUses: 0,
        isActive: true,
      };

      // Save to database
      await this.saveShareLink(shareLink);

      // Cache the share link
      this.shareCache.set(shareLink.id, shareLink);

      this.emit('share-link-created', { shareLink, options });

      return shareLink;
    } catch (error) {
      this.emit('share-error', { projectId, error: error.message });
      throw error;
    }
  }

  /**
   * Send invitations to specific users/emails
   */
  async sendInvitations(request: ShareRequest): Promise<ShareInvitation[]> {
    try {
      // Validate permissions
      await this.validateUserPermission(request.targetUsers[0], request.projectId, 'share');

      const invitations: ShareInvitation[] = [];

      // Process user invitations
      for (const userId of request.targetUsers) {
        const invitation = await this.createUserInvitation(request, userId);
        invitations.push(invitation);
      }

      // Process email invitations
      for (const email of request.targetEmails) {
        const invitation = await this.createEmailInvitation(request, email);
        invitations.push(invitation);
      }

      // Send invitation notifications
      await this.sendInvitationNotifications(invitations);

      this.emit('invitations-sent', { request, invitations });

      return invitations;
    } catch (error) {
      this.emit('invitation-error', { request, error: error.message });
      throw error;
    }
  }

  /**
   * Accept a project invitation
   */
  async acceptInvitation(invitationId: string, userId: UserId): Promise<CollaboratorAccess> {
    try {
      const invitation = await this.getInvitation(invitationId);

      if (!invitation) {
        throw new Error('Invitation not found');
      }

      if (invitation.status !== 'pending') {
        throw new Error(`Invitation is ${invitation.status}`);
      }

      if (invitation.expiresAt < new Date()) {
        throw new Error('Invitation has expired');
      }

      // Update invitation status
      invitation.status = 'accepted';
      invitation.toUserId = userId;
      await this.updateInvitation(invitation);

      // Add user as collaborator
      const collaborator: CollaboratorAccess = {
        userId,
        role: invitation.role,
        addedAt: new Date(),
        addedBy: invitation.fromUserId,
        permissions: this.getRolePermissions(invitation.role),
      };

      await this.addCollaborator(invitation.projectId, collaborator);

      this.emit('invitation-accepted', { invitation, collaborator });

      return collaborator;
    } catch (error) {
      this.emit('invitation-error', { invitationId, error: error.message });
      throw error;
    }
  }

  /**
   * Decline a project invitation
   */
  async declineInvitation(invitationId: string, userId: UserId): Promise<void> {
    try {
      const invitation = await this.getInvitation(invitationId);

      if (!invitation) {
        throw new Error('Invitation not found');
      }

      if (invitation.toUserId && invitation.toUserId !== userId) {
        throw new Error('Unauthorized to decline this invitation');
      }

      invitation.status = 'declined';
      await this.updateInvitation(invitation);

      this.emit('invitation-declined', { invitation });
    } catch (error) {
      this.emit('invitation-error', { invitationId, error: error.message });
      throw error;
    }
  }

  /**
   * Access a project via share link
   */
  async accessViaShareLink(
    shareId: ShareId,
    accessInfo: {
      userId?: UserId;
      email?: string;
      ipAddress: string;
      userAgent: string;
    }
  ): Promise<{
    projectId: ProjectId;
    accessLevel: ProjectRole;
    temporaryAccess: boolean;
  }> {
    try {
      const shareLink = await this.getShareLink(shareId);

      if (!shareLink) {
        throw new Error('Share link not found');
      }

      if (!shareLink.isActive) {
        throw new Error('Share link is inactive');
      }

      if (shareLink.expiresAt && shareLink.expiresAt < new Date()) {
        throw new Error('Share link has expired');
      }

      if (shareLink.maxUses && shareLink.currentUses >= shareLink.maxUses) {
        throw new Error('Share link usage limit exceeded');
      }

      if (!shareLink.allowAnonymous && !accessInfo.userId) {
        throw new Error('Authentication required');
      }

      // Log access
      await this.logShareAccess(shareLink, accessInfo);

      // Update usage count
      shareLink.currentUses++;
      await this.updateShareLink(shareLink);

      // Grant temporary access for anonymous users
      const temporaryAccess = !accessInfo.userId;

      if (accessInfo.userId && !temporaryAccess) {
        // Add as collaborator if authenticated user
        const collaborator: CollaboratorAccess = {
          userId: accessInfo.userId,
          role: shareLink.accessLevel,
          addedAt: new Date(),
          addedBy: shareLink.createdBy,
          permissions: this.getRolePermissions(shareLink.accessLevel),
        };

        await this.addCollaborator(shareLink.projectId, collaborator);
      }

      this.emit('share-link-accessed', { shareLink, accessInfo });

      return {
        projectId: shareLink.projectId,
        accessLevel: shareLink.accessLevel,
        temporaryAccess,
      };
    } catch (error) {
      this.emit('share-access-error', { shareId, error: error.message });
      throw error;
    }
  }

  /**
   * Update collaborator permissions
   */
  async updateCollaboratorRole(
    projectId: ProjectId,
    userId: UserId,
    newRole: ProjectRole,
    updatedBy: UserId
  ): Promise<void> {
    try {
      // Validate permissions
      await this.validateUserPermission(updatedBy, projectId, 'admin');

      const collaborator = await this.getCollaborator(projectId, userId);
      if (!collaborator) {
        throw new Error('Collaborator not found');
      }

      // Update role and permissions
      collaborator.role = newRole;
      collaborator.permissions = this.getRolePermissions(newRole);

      await this.updateCollaborator(projectId, collaborator);

      this.emit('collaborator-updated', { projectId, userId, newRole, updatedBy });
    } catch (error) {
      this.emit('collaborator-error', { projectId, userId, error: error.message });
      throw error;
    }
  }

  /**
   * Remove collaborator from project
   */
  async removeCollaborator(
    projectId: ProjectId,
    userId: UserId,
    removedBy: UserId
  ): Promise<void> {
    try {
      // Validate permissions
      await this.validateUserPermission(removedBy, projectId, 'admin');

      // Cannot remove project owner
      const project = await this.getProject(projectId);
      if (project.ownerId === userId) {
        throw new Error('Cannot remove project owner');
      }

      await this.deleteCollaborator(projectId, userId);

      this.emit('collaborator-removed', { projectId, userId, removedBy });
    } catch (error) {
      this.emit('collaborator-error', { projectId, userId, error: error.message });
      throw error;
    }
  }

  /**
   * Get project collaborators
   */
  async getCollaborators(projectId: ProjectId, requestedBy: UserId): Promise<CollaboratorAccess[]> {
    try {
      await this.validateUserPermission(requestedBy, projectId, 'read');
      return this.fetchCollaborators(projectId);
    } catch (error) {
      this.emit('collaborator-error', { projectId, error: error.message });
      throw error;
    }
  }

  /**
   * Get share analytics
   */
  async getShareAnalytics(shareId: ShareId, requestedBy: UserId): Promise<ShareAnalytics> {
    try {
      const shareLink = await this.getShareLink(shareId);
      if (!shareLink) {
        throw new Error('Share link not found');
      }

      await this.validateUserPermission(requestedBy, shareLink.projectId, 'admin');

      return this.fetchShareAnalytics(shareId);
    } catch (error) {
      this.emit('analytics-error', { shareId, error: error.message });
      throw error;
    }
  }

  /**
   * Revoke share link
   */
  async revokeShareLink(shareId: ShareId, revokedBy: UserId): Promise<void> {
    try {
      const shareLink = await this.getShareLink(shareId);
      if (!shareLink) {
        throw new Error('Share link not found');
      }

      await this.validateUserPermission(revokedBy, shareLink.projectId, 'admin');

      shareLink.isActive = false;
      await this.updateShareLink(shareLink);

      this.shareCache.delete(shareId);

      this.emit('share-link-revoked', { shareId, revokedBy });
    } catch (error) {
      this.emit('share-error', { shareId, error: error.message });
      throw error;
    }
  }

  // Private methods

  private generateShareId(): ShareId {
    return `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDefaultExpiration(): Date {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + this.config.defaultLinkExpiration);
    return expiration;
  }

  private async createUserInvitation(
    request: ShareRequest,
    userId: UserId
  ): Promise<ShareInvitation> {
    const user = await this.getUser(userId);

    const invitation: ShareInvitation = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      projectId: request.projectId,
      fromUserId: userId, // Note: This should be the requesting user, not target
      toUserId: userId,
      toEmail: user.email,
      role: request.role,
      message: request.message,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: request.expiresAt || this.getDefaultExpiration(),
    };

    await this.saveInvitation(invitation);
    this.invitationCache.set(invitation.id, invitation);

    return invitation;
  }

  private async createEmailInvitation(
    request: ShareRequest,
    email: string
  ): Promise<ShareInvitation> {
    const invitation: ShareInvitation = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      projectId: request.projectId,
      fromUserId: request.targetUsers[0], // Note: This should be the requesting user
      toEmail: email,
      role: request.role,
      message: request.message,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: request.expiresAt || this.getDefaultExpiration(),
    };

    await this.saveInvitation(invitation);
    this.invitationCache.set(invitation.id, invitation);

    return invitation;
  }

  private getRolePermissions(role: ProjectRole): ProjectPermission[] {
    const permissions: ProjectPermission[] = [];

    switch (role) {
      case 'owner':
        permissions.push(
          { action: 'admin', resource: 'project', granted: true },
          { action: 'delete', resource: 'project', granted: true },
          { action: 'share', resource: 'project', granted: true },
          { action: 'write', resource: 'nodes', granted: true },
          { action: 'write', resource: 'parameters', granted: true },
          { action: 'export', resource: 'geometry', granted: true }
        );
        break;

      case 'editor':
        permissions.push(
          { action: 'read', resource: 'project', granted: true },
          { action: 'write', resource: 'nodes', granted: true },
          { action: 'write', resource: 'parameters', granted: true },
          { action: 'write', resource: 'comments', granted: true },
          { action: 'export', resource: 'geometry', granted: true }
        );
        break;

      case 'viewer':
        permissions.push(
          { action: 'read', resource: 'project', granted: true },
          { action: 'read', resource: 'nodes', granted: true },
          { action: 'read', resource: 'parameters', granted: true },
          { action: 'write', resource: 'comments', granted: true }
        );
        break;

      case 'commenter':
        permissions.push(
          { action: 'read', resource: 'project', granted: true },
          { action: 'read', resource: 'nodes', granted: true },
          { action: 'write', resource: 'comments', granted: true }
        );
        break;
    }

    return permissions;
  }

  private async sendInvitationNotifications(invitations: ShareInvitation[]): Promise<void> {
    for (const invitation of invitations) {
      try {
        await this.sendInvitationEmail(invitation);
        this.emit('invitation-sent', { invitation });
      } catch (error) {
        this.emit('invitation-send-error', { invitation, error: error.message });
      }
    }
  }

  // API integration methods (to be implemented with actual backend)
  private async validateUserPermission(
    userId: UserId,
    projectId: ProjectId,
    action: string
  ): Promise<void> {
    // TODO: Implement permission validation
    console.log(`Validating ${userId} can ${action} on ${projectId}`);
  }

  private async saveShareLink(shareLink: ShareLink): Promise<void> {
    // TODO: Implement database save
    console.log('Saving share link:', shareLink.id);
  }

  private async updateShareLink(shareLink: ShareLink): Promise<void> {
    // TODO: Implement database update
    console.log('Updating share link:', shareLink.id);
  }

  private async getShareLink(shareId: ShareId): Promise<ShareLink | null> {
    // Check cache first
    if (this.shareCache.has(shareId)) {
      return this.shareCache.get(shareId)!;
    }
    // TODO: Implement database fetch
    return null;
  }

  private async saveInvitation(invitation: ShareInvitation): Promise<void> {
    // TODO: Implement database save
    console.log('Saving invitation:', invitation.id);
  }

  private async updateInvitation(invitation: ShareInvitation): Promise<void> {
    // TODO: Implement database update
    console.log('Updating invitation:', invitation.id);
  }

  private async getInvitation(invitationId: string): Promise<ShareInvitation | null> {
    // Check cache first
    if (this.invitationCache.has(invitationId)) {
      return this.invitationCache.get(invitationId)!;
    }
    // TODO: Implement database fetch
    return null;
  }

  private async getUser(userId: UserId): Promise<User> {
    // TODO: Implement user fetch
    return {
      id: userId,
      email: `user${userId}@example.com`,
      name: `User ${userId}`,
    } as User;
  }

  private async getProject(projectId: ProjectId): Promise<any> {
    // TODO: Implement project fetch
    return { ownerId: 'owner-user-id' };
  }

  private async addCollaborator(projectId: ProjectId, collaborator: CollaboratorAccess): Promise<void> {
    // TODO: Implement database save
    console.log('Adding collaborator:', collaborator.userId, 'to', projectId);
  }

  private async updateCollaborator(projectId: ProjectId, collaborator: CollaboratorAccess): Promise<void> {
    // TODO: Implement database update
    console.log('Updating collaborator:', collaborator.userId, 'in', projectId);
  }

  private async deleteCollaborator(projectId: ProjectId, userId: UserId): Promise<void> {
    // TODO: Implement database delete
    console.log('Removing collaborator:', userId, 'from', projectId);
  }

  private async getCollaborator(projectId: ProjectId, userId: UserId): Promise<CollaboratorAccess | null> {
    // TODO: Implement database fetch
    return null;
  }

  private async fetchCollaborators(projectId: ProjectId): Promise<CollaboratorAccess[]> {
    // TODO: Implement database fetch
    return [];
  }

  private async logShareAccess(shareLink: ShareLink, accessInfo: any): Promise<void> {
    // TODO: Implement access logging
    console.log('Logging share access:', shareLink.id);
  }

  private async fetchShareAnalytics(shareId: ShareId): Promise<ShareAnalytics> {
    // TODO: Implement analytics fetch
    return {
      shareId,
      totalAccesses: 0,
      uniqueUsers: 0,
      lastAccessed: new Date(),
      accessHistory: [],
    };
  }

  private async sendInvitationEmail(invitation: ShareInvitation): Promise<void> {
    // TODO: Implement email sending
    console.log('Sending invitation email to:', invitation.toEmail);
  }
}