
import { describe, it, expect } from 'vitest';
import { ApollonianGasketNode } from './apolloniangasket-node';
import { createTestContext } from '../test-utils';

describe('ApollonianGasketNode', () => {
  it('should create ApollonianGasket', async () => {
    const context = createTestContext();
    const inputs = {
      outerCircle: /* test value */
    };
    const params = {
      depth: 5,
      minRadius: 0.1
    };

    const result = await ApollonianGasketNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.circles).toBeDefined();
  });

  
});