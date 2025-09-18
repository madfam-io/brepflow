
import { describe, it, expect } from 'vitest';
import { DrillingOperationNode } from './drillingoperation-node';
import { createTestContext } from '../test-utils';

describe('DrillingOperationNode', () => {
  it('should create DrillingOperation', async () => {
    const context = createTestContext();
    const inputs = {
      holes: /* test value */,
      depths: /* test value */
    };
    const params = {
      drillDiameter: 8,
      peckDepth: 5,
      dwellTime: 0
    };

    const result = await DrillingOperationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.drillCycles).toBeDefined();
  });

  
});