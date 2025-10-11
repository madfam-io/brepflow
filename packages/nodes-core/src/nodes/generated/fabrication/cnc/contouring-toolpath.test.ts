
import { describe, it, expect } from 'vitest';
import { ContouringToolpathNode } from './contouring-toolpath.node';
import { createTestContext } from '../test-utils';

describe('ContouringToolpathNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      levels: 10,
      climb: true,
      compensation: "right"
    } as any;

    const result = await ContouringToolpathNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
