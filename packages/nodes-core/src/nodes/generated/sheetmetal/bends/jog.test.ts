
import { describe, it, expect } from 'vitest';
import { JogNode } from './jog.node';
import { createTestContext } from '../test-utils';

describe('JogNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      jogLine: undefined
    } as any;
    const params = {
      jogOffset: 10,
      jogAngle: 90,
      bendRadius: 3
    } as any;

    const result = await JogNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
