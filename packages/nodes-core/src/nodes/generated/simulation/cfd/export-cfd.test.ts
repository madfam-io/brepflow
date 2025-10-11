
import { describe, it, expect } from 'vitest';
import { ExportCFDNode } from './export-cfd.node';
import { createTestContext } from '../test-utils';

describe('ExportCFDNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      cfdModel: undefined,
      setupData: undefined
    } as any;
    const params = {
      format: "openfoam",
      meshFormat: "polyhedral"
    } as any;

    const result = await ExportCFDNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
