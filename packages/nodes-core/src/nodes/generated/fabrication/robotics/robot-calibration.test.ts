
import { describe, it, expect } from 'vitest';
import { RobotCalibrationNode } from './robot-calibration.node';
import { createTestContext } from '../test-utils';

describe('RobotCalibrationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      measurementPoints: undefined
    } as any;
    const params = {
      method: "dh-parameters"
    } as any;

    const result = await RobotCalibrationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
