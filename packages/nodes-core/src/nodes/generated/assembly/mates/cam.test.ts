
import { describe, it, expect } from 'vitest';
import { CamNode } from './cam.node';
import { createTestContext } from '../test-utils';

describe('CamNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      cam: undefined,
      follower: undefined
    } as any;
    const params = {

    } as any;

    const result = await CamNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
