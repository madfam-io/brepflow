
import { describe, it, expect } from 'vitest';
import { JogNode } from './jog-node';
import { createTestContext } from '../test-utils';

describe('JogNode', () => {
  it('should create Jog', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */,
      jogLine: /* test value */
    };
    const params = {
      jogOffset: 10,
      jogAngle: 90,
      bendRadius: 3
    };

    const result = await JogNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});