
import { describe, it, expect } from 'vitest';
import { AdditiveManufacturingNode } from './additivemanufacturing.node';
import { createTestContext } from './../../test-utils';

describe('AdditiveManufacturingNode', () => {
  it('should create AdditiveManufacturing', async () => {
    const context = createTestContext();
    const inputs = {
      printPaths: null
    };
    const params = {
      nozzleSize: 4,
      layerHeight: 2
    };

    const result = await AdditiveManufacturingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.roboticPrintPath).toBeDefined();
  });

  
});