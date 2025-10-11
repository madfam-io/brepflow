
import { describe, it, expect } from 'vitest';
import { ImportBREPNode } from './import-brep.node';
import { createTestContext } from '../test-utils';

describe('ImportBREPNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      version: "auto"
    } as any;

    const result = await ImportBREPNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
