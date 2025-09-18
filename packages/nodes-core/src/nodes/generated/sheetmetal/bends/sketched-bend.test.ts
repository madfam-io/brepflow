
import { describe, it, expect } from 'vitest';
import { SketchedBendNode } from './sketchedbend-node';
import { createTestContext } from '../test-utils';

describe('SketchedBendNode', () => {
  it('should create SketchedBend', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */,
      bendLine: /* test value */
    };
    const params = {
      angle: 90,
      bendRadius: 3,
      bendDirection: "up",
      bendAllowance: 0
    };

    const result = await SketchedBendNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});