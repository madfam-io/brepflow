
import { describe, it, expect } from 'vitest';
import { AwningWindowNode } from './awningwindow-node';
import { createTestContext } from '../test-utils';

describe('AwningWindowNode', () => {
  it('should create AwningWindow', async () => {
    const context = createTestContext();
    const inputs = {
      opening: null
    };
    const params = {
      opening: 0
    };

    const result = await AwningWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.window).toBeDefined();
  });

  
});