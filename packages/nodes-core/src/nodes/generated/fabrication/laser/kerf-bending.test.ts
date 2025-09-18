
import { describe, it, expect } from 'vitest';
import { KerfBendingNode } from './kerfbending-node';
import { createTestContext } from '../test-utils';

describe('KerfBendingNode', () => {
  it('should create KerfBending', async () => {
    const context = createTestContext();
    const inputs = {
      bendZone: /* test value */
    };
    const params = {
      bendRadius: 50,
      materialThickness: 3,
      kerfWidth: 0.15
    };

    const result = await KerfBendingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.kerfPattern).toBeDefined();
  });

  
});