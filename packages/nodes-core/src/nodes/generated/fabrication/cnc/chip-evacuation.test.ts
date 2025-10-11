
import { describe, it, expect } from 'vitest';
import { ChipEvacuationNode } from './chip-evacuation.node';
import { createTestContext } from '../test-utils';

describe('ChipEvacuationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      pocket: undefined
    } as any;
    const params = {
      flutes: 2,
      helixAngle: 30
    } as any;

    const result = await ChipEvacuationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
