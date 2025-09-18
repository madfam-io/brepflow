
import { describe, it, expect } from 'vitest';
import { WorkCellSetupNode } from './workcellsetup-node';
import { createTestContext } from '../test-utils';

describe('WorkCellSetupNode', () => {
  it('should create WorkCellSetup', async () => {
    const context = createTestContext();
    const inputs = {
      cellBoundary: null
    };
    const params = {
      robotCount: 1
    };

    const result = await WorkCellSetupNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.workCell).toBeDefined();
  });

  
});