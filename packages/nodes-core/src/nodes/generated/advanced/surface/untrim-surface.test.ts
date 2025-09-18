
import { describe, it, expect } from 'vitest';
import { UntrimSurfaceNode } from './untrimsurface-node';
import { createTestContext } from '../test-utils';

describe('UntrimSurfaceNode', () => {
  it('should create UntrimSurface', async () => {
    const context = createTestContext();
    const inputs = {
      trimmedSurface: /* test value */
    };
    const params = {
      keepHoles: false
    };

    const result = await UntrimSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.untrimmedSurface).toBeDefined();
  });

  
});