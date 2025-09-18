
import { describe, it, expect } from 'vitest';
import { ExportCFDNode } from './exportcfd-node';
import { createTestContext } from '../test-utils';

describe('ExportCFDNode', () => {
  it('should create ExportCFD', async () => {
    const context = createTestContext();
    const inputs = {
      cfdModel: /* test value */,
      setupData: /* test value */
    };
    const params = {
      format: "openfoam",
      meshFormat: "polyhedral"
    };

    const result = await ExportCFDNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cfdFiles).toBeDefined();
  });

  
});