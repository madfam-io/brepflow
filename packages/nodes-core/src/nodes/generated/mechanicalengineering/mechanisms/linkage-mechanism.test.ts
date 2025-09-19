
import { describe, it, expect } from 'vitest';
import { LinkageMechanismNode } from './linkagemechanism.node';
import { createTestContext } from './../../test-utils';

describe('LinkageMechanismNode', () => {
  it('should create LinkageMechanism', async () => {
    const context = createTestContext();
    const inputs = {
      basePoints: null
    };
    const params = {
      type: "four-bar",
      linkLength1: 50,
      linkLength2: 80,
      linkLength3: 60,
      angle: 0
    };

    const result = await LinkageMechanismNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mechanism).toBeDefined();
    expect(result.links).toBeDefined();
    expect(result.joints).toBeDefined();
  });

  
});