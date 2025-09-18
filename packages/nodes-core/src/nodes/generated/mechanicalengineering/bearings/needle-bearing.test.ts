
import { describe, it, expect } from 'vitest';
import { NeedleBearingNode } from './needlebearing-node';
import { createTestContext } from '../test-utils';

describe('NeedleBearingNode', () => {
  it('should create NeedleBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      innerDiameter: 15,
      outerDiameter: 21,
      width: 12,
      needleCount: 20
    };

    const result = await NeedleBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.needles).toBeDefined();
  });

  
});