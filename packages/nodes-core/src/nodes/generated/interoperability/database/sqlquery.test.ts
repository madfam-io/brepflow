
import { describe, it, expect } from 'vitest';
import { SQLQueryNode } from './sqlquery.node';
import { createTestContext } from '../test-utils';

describe('SQLQueryNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      connectionString: "",
      query: "SELECT * FROM table",
      timeout: 30
    } as any;

    const result = await SQLQueryNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
