
import { describe, it, expect } from 'vitest';
import { LeadInOutNode } from './lead-in-out.node';
import { createTestContext } from '../test-utils';

describe('LeadInOutNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      paths: undefined
    } as any;
    const params = {
      leadLength: 2,
      leadType: "line"
    } as any;

    const result = await LeadInOutNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
