
import { describe, it, expect } from 'vitest';
import { FlexNode } from './flex-node';
import { createTestContext } from '../test-utils';

describe('FlexNode', () => {
  it('should create Flex', async () => {
    const context = createTestContext();
    const inputs = {
      solid: null,
      bendPlane: null
    };
    const params = {
      bendAngle: 90,
      bendRadius: 10,
      accuracy: 1
    };

    const result = await FlexNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.flexed).toBeDefined();
  });

  
});