
import { describe, it, expect } from 'vitest';
import { ToolLibraryNode } from './tool-library.node';
import { createTestContext } from '../test-utils';

describe('ToolLibraryNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      toolNumber: 1,
      toolType: "endmill"
    } as any;

    const result = await ToolLibraryNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
