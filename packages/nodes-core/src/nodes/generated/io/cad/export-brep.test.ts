
import { describe, it, expect } from 'vitest';
import { ExportBREPNode } from './export-brep.node';
import { createTestContext } from '../test-utils';

describe('ExportBREPNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      binary: false
    } as any;

    const result = await ExportBREPNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
