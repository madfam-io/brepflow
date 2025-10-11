
import { describe, it, expect } from 'vitest';
import { ImportJSONNode } from './import-json.node';
import { createTestContext } from '../test-utils';

describe('ImportJSONNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      jsonData: undefined
    } as any;
    const params = {
      format: "brepflow"
    } as any;

    const result = await ImportJSONNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
