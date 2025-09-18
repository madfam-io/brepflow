
import { describe, it, expect } from 'vitest';
import { ClearanceCheckNode } from './clearancecheck-node';
import { createTestContext } from '../test-utils';

describe('ClearanceCheckNode', () => {
  it('should create ClearanceCheck', async () => {
    const context = createTestContext();
    const inputs = {
      movingObject: null,
      obstacles: null
    };
    const params = {
      requiredClearance: 5,
      highlightViolations: true
    };

    const result = await ClearanceCheckNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hasViolations).toBeDefined();
    expect(result.violationPoints).toBeDefined();
    expect(result.clearanceValues).toBeDefined();
  });

  
});