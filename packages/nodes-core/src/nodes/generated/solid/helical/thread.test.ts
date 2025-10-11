
import { describe, it, expect } from 'vitest';
import { ThreadNode } from './thread.node';
import { createTestContext } from '../test-utils';

describe('ThreadNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      majorRadius: 50,
      pitch: 5,
      height: 100,
      threadAngle: 60,
      internal: false
    } as any;

    const result = await ThreadNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
