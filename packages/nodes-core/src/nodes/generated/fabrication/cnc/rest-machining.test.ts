
import { describe, it, expect } from 'vitest';
import { RestMachiningNode } from './restmachining.node';
import { createTestContext } from './../../test-utils';

describe('RestMachiningNode', () => {
  it('should create RestMachining', async () => {
    const context = createTestContext();
    const inputs = {
      model: null,
      previousPaths: null
    };
    const params = {
      previousTool: 10,
      currentTool: 3
    };

    const result = await RestMachiningNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.restAreas).toBeDefined();
    expect(result.restPaths).toBeDefined();
  });

  
});