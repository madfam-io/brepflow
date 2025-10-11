
import { describe, it, expect } from 'vitest';
import { ToBase64Node } from './to-base64.node';
import { createTestContext } from '../test-utils';

describe('ToBase64Node', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {

    } as any;

    const result = await ToBase64Node.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
