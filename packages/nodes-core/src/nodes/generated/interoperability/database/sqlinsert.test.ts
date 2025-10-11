
import { describe, it, expect } from 'vitest';
import { SQLInsertNode } from './sqlinsert.node';
import { createTestContext } from '../test-utils';

describe('SQLInsertNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {
      connectionString: "",
      tableName: "",
      batchSize: 100
    } as any;

    const result = await SQLInsertNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
