
import { describe, it, expect } from 'vitest';
import { ImportSTLNode } from './import-stl.node';
import { createTestContext } from '../test-utils';

describe('ImportSTLNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      units: "mm",
      validate: true
    } as any;

    const result = await ImportSTLNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
