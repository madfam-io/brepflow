
import { describe, it, expect } from 'vitest';
import { ToJSONNode } from './to-json.node';
import { createTestContext } from '../test-utils';

describe('ToJSONNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {
      pretty: false
    } as any;

    const result = await ToJSONNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
