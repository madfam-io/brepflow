
import { describe, it, expect } from 'vitest';
import { DrillingOperationNode } from './drilling-operation.node';
import { createTestContext } from '../test-utils';

describe('DrillingOperationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      holes: undefined,
      depths: undefined
    } as any;
    const params = {
      drillDiameter: 8,
      peckDepth: 5,
      dwellTime: 0
    } as any;

    const result = await DrillingOperationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
