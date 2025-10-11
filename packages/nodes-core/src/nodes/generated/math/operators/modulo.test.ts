
import { describe, it, expect } from 'vitest';
import { ModuloNode } from './modulo.node';
import { createTestContext } from '../test-utils';

describe('ModuloNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await ModuloNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
