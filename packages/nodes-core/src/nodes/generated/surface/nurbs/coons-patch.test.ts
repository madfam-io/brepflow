
import { describe, it, expect } from 'vitest';
import { CoonsPatchNode } from './coons-patch.node';
import { createTestContext } from '../test-utils';

describe('CoonsPatchNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      edge1: undefined,
      edge2: undefined,
      edge3: undefined,
      edge4: undefined
    } as any;
    const params = {

    } as any;

    const result = await CoonsPatchNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
