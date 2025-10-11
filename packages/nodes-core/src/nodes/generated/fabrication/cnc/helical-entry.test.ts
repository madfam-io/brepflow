
import { describe, it, expect } from 'vitest';
import { HelicalEntryNode } from './helical-entry.node';
import { createTestContext } from '../test-utils';

describe('HelicalEntryNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entryPoint: undefined,
      depth: undefined
    } as any;
    const params = {
      helixDiameter: 10,
      helixAngle: 3
    } as any;

    const result = await HelicalEntryNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
