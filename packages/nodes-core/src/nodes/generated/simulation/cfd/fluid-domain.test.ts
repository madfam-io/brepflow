
import { describe, it, expect } from 'vitest';
import { FluidDomainNode } from './fluiddomain.node';
import { createTestContext } from './../../test-utils';

describe('FluidDomainNode', () => {
  it('should create FluidDomain', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null
    };
    const params = {
      domainType: "external",
      boundingBoxScale: [3,3,3],
      refinementDistance: 10
    };

    const result = await FluidDomainNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fluidDomain).toBeDefined();
    expect(result.walls).toBeDefined();
  });

  
});