
import { describe, it, expect } from 'vitest';
import { FlowAttractorNode } from './flowattractor.node';
import { createTestContext } from './../../test-utils';

describe('FlowAttractorNode', () => {
  it('should create FlowAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      velocity: 10,
      turbulence: 0.1,
      viscosity: 0.1
    };

    const result = await FlowAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});