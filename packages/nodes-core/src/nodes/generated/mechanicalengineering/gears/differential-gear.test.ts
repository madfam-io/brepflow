
import { describe, it, expect } from 'vitest';
import { DifferentialGearNode } from './differentialgear-node';
import { createTestContext } from '../test-utils';

describe('DifferentialGearNode', () => {
  it('should create DifferentialGear', async () => {
    const context = createTestContext();
    const inputs = {
      housingCenter: null
    };
    const params = {
      ringGearTeeth: 41,
      pinionTeeth: 13,
      spiderGearTeeth: 10,
      module: 3
    };

    const result = await DifferentialGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.assembly).toBeDefined();
    expect(result.housing).toBeDefined();
    expect(result.gears).toBeDefined();
  });

  
});