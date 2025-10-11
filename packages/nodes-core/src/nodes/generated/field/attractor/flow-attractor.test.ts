
import { describe, it, expect } from 'vitest';
import { FlowAttractorNode } from './flow-attractor.node';
import { createTestContext } from '../test-utils';

describe('FlowAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      velocity: 10,
      turbulence: 0.1,
      viscosity: 0.1
    } as any;

    const result = await FlowAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
