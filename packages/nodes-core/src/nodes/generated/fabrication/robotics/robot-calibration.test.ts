
import { describe, it, expect } from 'vitest';
import { RobotCalibrationNode } from './robotcalibration-node';
import { createTestContext } from '../test-utils';

describe('RobotCalibrationNode', () => {
  it('should create RobotCalibration', async () => {
    const context = createTestContext();
    const inputs = {
      measurementPoints: /* test value */
    };
    const params = {
      method: "dh-parameters"
    };

    const result = await RobotCalibrationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.calibrationMatrix).toBeDefined();
    expect(result.accuracy).toBeDefined();
  });

  
});