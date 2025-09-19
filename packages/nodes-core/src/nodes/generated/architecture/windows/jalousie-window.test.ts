
import { describe, it, expect } from 'vitest';
import { JalousieWindowNode } from './jalousiewindow.node';
import { createTestContext } from './../../test-utils';

describe('JalousieWindowNode', () => {
  it('should create JalousieWindow', async () => {
    const context = createTestContext();
    const inputs = {
      opening: null
    };
    const params = {
      slats: 10,
      angle: 0
    };

    const result = await JalousieWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.jalousie).toBeDefined();
    expect(result.slats).toBeDefined();
  });

  
});