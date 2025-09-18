
import { describe, it, expect } from 'vitest';
import { ToolLibraryNode } from './toollibrary-node';
import { createTestContext } from '../test-utils';

describe('ToolLibraryNode', () => {
  it('should create ToolLibrary', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      toolNumber: 1,
      toolType: "endmill"
    };

    const result = await ToolLibraryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.toolData).toBeDefined();
  });

  
});