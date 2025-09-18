
import { describe, it, expect } from 'vitest';
import { VaseModeNode } from './vasemode-node';
import { createTestContext } from '../test-utils';

describe('VaseModeNode', () => {
  it('should create VaseMode', async () => {
    const context = createTestContext();
    const inputs = {
      model: /* test value */
    };
    const params = {
      bottomLayers: 3
    };

    const result = await VaseModeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spiralPath).toBeDefined();
  });

  
});