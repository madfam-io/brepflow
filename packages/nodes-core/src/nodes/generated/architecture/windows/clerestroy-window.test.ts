
import { describe, it, expect } from 'vitest';
import { ClerestroyWindowNode } from './clerestroywindow-node';
import { createTestContext } from '../test-utils';

describe('ClerestroyWindowNode', () => {
  it('should create ClerestroyWindow', async () => {
    const context = createTestContext();
    const inputs = {
      wallTop: null
    };
    const params = {
      height: 600,
      continuous: true
    };

    const result = await ClerestroyWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.clerestory).toBeDefined();
  });

  
});