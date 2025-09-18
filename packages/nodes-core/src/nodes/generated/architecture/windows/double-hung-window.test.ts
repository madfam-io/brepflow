
import { describe, it, expect } from 'vitest';
import { DoubleHungWindowNode } from './doublehungwindow-node';
import { createTestContext } from '../test-utils';

describe('DoubleHungWindowNode', () => {
  it('should create DoubleHungWindow', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      width: 900,
      height: 1500,
      sashPosition: 0.5
    };

    const result = await DoubleHungWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.window).toBeDefined();
    expect(result.upperSash).toBeDefined();
    expect(result.lowerSash).toBeDefined();
  });

  
});