
import { describe, it, expect } from 'vitest';
import { SQLQueryNode } from './sqlquery-node';
import { createTestContext } from '../test-utils';

describe('SQLQueryNode', () => {
  it('should create SQLQuery', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      connectionString: "",
      query: "SELECT * FROM table",
      timeout: 30
    };

    const result = await SQLQueryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.rowCount).toBeDefined();
    expect(result.columns).toBeDefined();
  });

  
});