import type { NodeDefinition } from '@brepflow/types';

export class NodeRegistry {
  private static instance: NodeRegistry;
  private nodes = new Map<string, NodeDefinition>();
  private categories = new Map<string, Set<string>>();

  private constructor() {}

  static getInstance(): NodeRegistry {
    if (!NodeRegistry.instance) {
      NodeRegistry.instance = new NodeRegistry();
    }
    return NodeRegistry.instance;
  }

  /**
   * Register a node definition
   */
  registerNode(definition: NodeDefinition): void {
    this.nodes.set(definition.type, definition);

    // Update category index
    if (!this.categories.has(definition.category)) {
      this.categories.set(definition.category, new Set());
    }
    this.categories.get(definition.category)!.add(definition.type);
  }

  /**
   * Register multiple node definitions
   */
  registerNodes(definitions: NodeDefinition[]): void {
    for (const def of definitions) {
      this.registerNode(def);
    }
  }

  /**
   * Get a node definition by type
   */
  getNode(type: string): NodeDefinition | undefined {
    return this.nodes.get(type);
  }

  /**
   * Get all registered node types
   */
  getAllNodeTypes(): string[] {
    return Array.from(this.nodes.keys());
  }

  /**
   * Get nodes by category
   */
  getNodesByCategory(category: string): NodeDefinition[] {
    const types = this.categories.get(category);
    if (!types) return [];

    return Array.from(types)
      .map(type => this.nodes.get(type))
      .filter(Boolean) as NodeDefinition[];
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  /**
   * Check if a node type exists
   */
  hasNode(type: string): boolean {
    return this.nodes.has(type);
  }

  /**
   * Clear all registrations
   */
  clear(): void {
    this.nodes.clear();
    this.categories.clear();
  }
}