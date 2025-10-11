
import { describe, it, expect } from 'vitest';
import { ImportACISNode } from './import-acis.node';
import { createTestContext } from '../test-utils';

describe('ImportACISNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      version: "auto",
      healGeometry: true
    } as any;

    const result = await ImportACISNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
