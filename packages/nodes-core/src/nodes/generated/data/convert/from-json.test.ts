
import { describe, it, expect } from 'vitest';
import { FromJSONNode } from './from-json.node';
import { createTestContext } from '../test-utils';

describe('FromJSONNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      json: undefined
    } as any;
    const params = {

    } as any;

    const result = await FromJSONNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
