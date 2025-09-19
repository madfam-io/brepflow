
import { describe, it, expect } from 'vitest';
import { AirAssistNode } from './airassist.node';
import { createTestContext } from './../../test-utils';

describe('AirAssistNode', () => {
  it('should create AirAssist', async () => {
    const context = createTestContext();
    const inputs = {
      material: null
    };
    const params = {
      pressure: 20,
      nozzleType: "standard"
    };

    const result = await AirAssistNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.airSettings).toBeDefined();
  });

  
});