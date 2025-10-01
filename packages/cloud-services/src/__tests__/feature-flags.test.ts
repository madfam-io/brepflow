import { describe, expect, afterEach, beforeEach, it } from 'vitest';
import { CloudSyncManager } from '../sync/cloud-sync-manager';
import { ProjectSharingManager } from '../sharing/project-sharing-manager';
import type { CloudSyncConfig } from '../sync/cloud-sync-manager';
import type { SharingConfig } from '../sharing/project-sharing-manager';

describe('cloud services feature flags', () => {
  const originalEnv = { ...process.env };
  const originalGlobals: Record<string, unknown> = {};

  const restoreGlobals = () => {
    for (const key of Object.keys(originalGlobals)) {
      if (originalGlobals[key] === undefined) {
        delete (globalThis as any)[key];
      } else {
        (globalThis as any)[key] = originalGlobals[key];
      }
    }
  };

  beforeEach(() => {
    Object.assign(originalGlobals, {
      __BREPFLOW_ENABLE_CLOUD_SYNC__: (globalThis as any).__BREPFLOW_ENABLE_CLOUD_SYNC__,
      __BREPFLOW_ENABLE_PROJECT_SHARING__: (globalThis as any).__BREPFLOW_ENABLE_PROJECT_SHARING__,
    });
    delete (globalThis as any).__BREPFLOW_ENABLE_CLOUD_SYNC__;
    delete (globalThis as any).__BREPFLOW_ENABLE_PROJECT_SHARING__;
    process.env = { ...originalEnv };
    delete process.env.BREPFLOW_ENABLE_CLOUD_SYNC;
    delete process.env.BREPFLOW_ENABLE_PROJECT_SHARING;
  });

  afterEach(() => {
    process.env = originalEnv;
    restoreGlobals();
  });

  const syncConfig: CloudSyncConfig = {
    apiEndpoint: 'https://example.com',
    deviceId: 'device',
    userId: 'user',
    syncInterval: 60000,
    maxRetries: 1,
    batchSize: 10,
    compressionEnabled: false,
    conflictResolution: 'latest-wins',
  } as const;

  const sharingConfig: SharingConfig = {
    apiEndpoint: 'https://example.com',
    maxSharesPerProject: 1,
    defaultLinkExpiration: 7,
    allowAnonymousAccess: false,
    requireEmailVerification: true,
  };

  it('disables CloudSyncManager unless explicitly enabled', () => {
    expect(() => new CloudSyncManager(syncConfig)).toThrow(/Cloud sync is disabled/);
  });

  it('allows CloudSyncManager when BREPFLOW_ENABLE_CLOUD_SYNC=true', () => {
    process.env.BREPFLOW_ENABLE_CLOUD_SYNC = 'true';
    const manager = new CloudSyncManager(syncConfig);
    expect(manager).toBeInstanceOf(CloudSyncManager);
  });

  it('disables ProjectSharingManager unless explicitly enabled', () => {
    expect(() => new ProjectSharingManager(sharingConfig)).toThrow(/Project sharing is disabled/);
  });

  it('allows ProjectSharingManager when BREPFLOW_ENABLE_PROJECT_SHARING=true', () => {
    process.env.BREPFLOW_ENABLE_PROJECT_SHARING = 'true';
    const manager = new ProjectSharingManager(sharingConfig);
    expect(manager).toBeInstanceOf(ProjectSharingManager);
  });
});
