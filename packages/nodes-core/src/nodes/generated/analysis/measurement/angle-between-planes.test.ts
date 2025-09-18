
import { describe, it, expect } from 'vitest';
import { AngleBetweenPlanesNode } from './anglebetweenplanes-node';
import { createTestContext } from '../test-utils';

describe('AngleBetweenPlanesNode', () => {
  it('should create AngleBetweenPlanes', async () => {
    const context = createTestContext();
    const inputs = {
      plane1: /* test value */,
      plane2: /* test value */
    };
    const params = {
      unit: "degrees"
    };

    const result = await AngleBetweenPlanesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
  });

  
});