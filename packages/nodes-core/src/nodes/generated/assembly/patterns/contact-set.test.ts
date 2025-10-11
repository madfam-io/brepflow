
import { describe, it, expect } from 'vitest';
import { ContactSetNode } from './contact-set.node';
import { createTestContext } from '../test-utils';

describe('ContactSetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      faces1: undefined,
      faces2: undefined
    } as any;
    const params = {
      type: "no_penetration",
      friction: 0.3
    } as any;

    const result = await ContactSetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
