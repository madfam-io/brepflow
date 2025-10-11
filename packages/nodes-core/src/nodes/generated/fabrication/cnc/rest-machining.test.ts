
import { describe, it, expect } from 'vitest';
import { RestMachiningNode } from './rest-machining.node';
import { createTestContext } from '../test-utils';

describe('RestMachiningNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined,
      previousPaths: undefined
    } as any;
    const params = {
      previousTool: 10,
      currentTool: 3
    } as any;

    const result = await RestMachiningNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
