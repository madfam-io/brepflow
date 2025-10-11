
import { describe, it, expect } from 'vitest';
import { FieldStreamLinesNode } from './field-stream-lines.node';
import { createTestContext } from '../test-utils';

describe('FieldStreamLinesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      seedCount: 20,
      stepSize: 0.1,
      maxSteps: 100
    } as any;

    const result = await FieldStreamLinesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
