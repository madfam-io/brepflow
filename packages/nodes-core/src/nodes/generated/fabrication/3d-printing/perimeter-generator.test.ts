
import { describe, it, expect } from 'vitest';
import { PerimeterGeneratorNode } from './perimetergenerator-node';
import { createTestContext } from '../test-utils';

describe('PerimeterGeneratorNode', () => {
  it('should create PerimeterGenerator', async () => {
    const context = createTestContext();
    const inputs = {
      slice: /* test value */
    };
    const params = {
      perimeters: 3,
      extrusionWidth: 0.4
    };

    const result = await PerimeterGeneratorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.perimeters).toBeDefined();
  });

  
});