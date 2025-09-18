
import { describe, it, expect } from 'vitest';
import { AcousticCeilingNode } from './acousticceiling-node';
import { createTestContext } from '../test-utils';

describe('AcousticCeilingNode', () => {
  it('should create AcousticCeiling', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingArea: null
    };
    const params = {
      nrc: 0.85,
      panelType: "tiles"
    };

    const result = await AcousticCeilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.acousticCeiling).toBeDefined();
  });

  
});