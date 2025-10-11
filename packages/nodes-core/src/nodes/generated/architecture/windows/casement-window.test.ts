
import { describe, it, expect } from 'vitest';
import { CasementWindowNode } from './casement-window.node';
import { createTestContext } from '../test-utils';

describe('CasementWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      width: 600,
      height: 1200,
      hinge: "left",
      opening: 0
    } as any;

    const result = await CasementWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
