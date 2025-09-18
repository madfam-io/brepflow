
import { describe, it, expect } from 'vitest';
import { NurbsSurfaceNode } from './nurbssurface-node';
import { createTestContext } from '../test-utils';

describe('NurbsSurfaceNode', () => {
  it('should create NurbsSurface', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: /* test value */
    };
    const params = {
      degreeU: 3,
      degreeV: 3,
      periodicU: false,
      periodicV: false
    };

    const result = await NurbsSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});