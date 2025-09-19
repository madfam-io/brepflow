
import { describe, it, expect } from 'vitest';
import { LeadInOutNode } from './leadinout.node';
import { createTestContext } from './../../test-utils';

describe('LeadInOutNode', () => {
  it('should create LeadInOut', async () => {
    const context = createTestContext();
    const inputs = {
      paths: null
    };
    const params = {
      leadLength: 2,
      leadType: "line"
    };

    const result = await LeadInOutNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pathsWithLeads).toBeDefined();
  });

  
});