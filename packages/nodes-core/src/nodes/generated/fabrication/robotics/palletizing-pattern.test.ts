
import { describe, it, expect } from 'vitest';
import { PalletizingPatternNode } from './palletizingpattern.node';
import { createTestContext } from './../../test-utils';

describe('PalletizingPatternNode', () => {
  it('should create PalletizingPattern', async () => {
    const context = createTestContext();
    const inputs = {
      boxSize: null,
      palletSize: null
    };
    const params = {
      pattern: "interlocked",
      layersCount: 10
    };

    const result = await PalletizingPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.placementPoints).toBeDefined();
  });

  
});