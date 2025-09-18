
import { describe, it, expect } from 'vitest';
import { SQLInsertNode } from './sqlinsert-node';
import { createTestContext } from '../test-utils';

describe('SQLInsertNode', () => {
  it('should create SQLInsert', async () => {
    const context = createTestContext();
    const inputs = {
      data: null
    };
    const params = {
      connectionString: "",
      tableName: "",
      batchSize: 100
    };

    const result = await SQLInsertNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.insertedRows).toBeDefined();
    expect(result.errors).toBeDefined();
  });

  
});