
import { describe, it, expect } from 'vitest';
import { SoundproofWallNode } from './soundproofwall-node';
import { createTestContext } from '../test-utils';

describe('SoundproofWallNode', () => {
  it('should create SoundproofWall', async () => {
    const context = createTestContext();
    const inputs = {
      wallPath: null
    };
    const params = {
      stcRating: 50,
      massLayers: 2
    };

    const result = await SoundproofWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.acousticWall).toBeDefined();
  });

  
});