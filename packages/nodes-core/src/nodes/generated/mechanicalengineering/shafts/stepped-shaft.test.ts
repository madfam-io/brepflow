
import { describe, it, expect } from 'vitest';
import { SteppedShaftNode } from './steppedshaft.node';
import { createTestContext } from './../../test-utils';

describe('SteppedShaftNode', () => {
  it('should create SteppedShaft', async () => {
    const context = createTestContext();
    const inputs = {
      centerline: null
    };
    const params = {
      sections: "20x50,25x80,20x30",
      chamfers: true,
      filletRadius: 1
    };

    const result = await SteppedShaftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shaft).toBeDefined();
    expect(result.sections).toBeDefined();
  });

  
});