
import { describe, it, expect } from 'vitest';
import { ReflectionLinesNode } from './reflectionlines-node';
import { createTestContext } from '../test-utils';

describe('ReflectionLinesNode', () => {
  it('should create ReflectionLines', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      lineCount: 10,
      viewDirection: [0,0,1]
    };

    const result = await ReflectionLinesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.reflectionLines).toBeDefined();
  });

  
});