
import { describe, it, expect } from 'vitest';
import { CamNode } from './cam-node';
import { createTestContext } from '../test-utils';

describe('CamNode', () => {
  it('should create Cam', async () => {
    const context = createTestContext();
    const inputs = {
      cam: null,
      follower: null
    };
    const params = {
      
    };

    const result = await CamNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cammed).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});