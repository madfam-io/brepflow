
import { describe, it, expect } from 'vitest';
import { FromBase64Node } from './from-base64.node';
import { createTestContext } from '../test-utils';

describe('FromBase64Node', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      base64: undefined
    } as any;
    const params = {

    } as any;

    const result = await FromBase64Node.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
