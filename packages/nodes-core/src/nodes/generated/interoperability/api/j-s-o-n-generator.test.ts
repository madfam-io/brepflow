
import { describe, it, expect } from 'vitest';
import { JSONGeneratorNode } from './jsongenerator-node';
import { createTestContext } from '../test-utils';

describe('JSONGeneratorNode', () => {
  it('should create JSONGenerator', async () => {
    const context = createTestContext();
    const inputs = {
      data: null
    };
    const params = {
      indent: 2,
      compact: false
    };

    const result = await JSONGeneratorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.json).toBeDefined();
    expect(result.size).toBeDefined();
  });

  
});