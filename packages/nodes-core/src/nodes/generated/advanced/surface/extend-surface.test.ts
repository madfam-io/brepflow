
import { describe, it, expect } from 'vitest';
import { ExtendSurfaceNode } from './extendsurface-node';
import { createTestContext } from '../test-utils';

describe('ExtendSurfaceNode', () => {
  it('should create ExtendSurface', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */,
      edges: /* test value */
    };
    const params = {
      extensionLength: 10,
      extensionType: "natural"
    };

    const result = await ExtendSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.extendedSurface).toBeDefined();
  });

  
});