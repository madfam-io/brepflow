
import { describe, it, expect } from 'vitest';
import { HTTPRequestNode } from './httprequest.node';
import { createTestContext } from '../test-utils';

describe('HTTPRequestNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      method: "GET",
      url: "",
      timeout: 30,
      retries: 3
    } as any;

    const result = await HTTPRequestNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
