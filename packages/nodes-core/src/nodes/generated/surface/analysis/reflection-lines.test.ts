
import { describe, it, expect } from 'vitest';
import { ReflectionLinesNode } from './reflection-lines.node';
import { createTestContext } from '../test-utils';

describe('ReflectionLinesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      lineCount: 10,
      viewDirection: [0,0,1]
    } as any;

    const result = await ReflectionLinesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
