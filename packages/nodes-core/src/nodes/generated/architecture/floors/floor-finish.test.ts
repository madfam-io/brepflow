
import { describe, it, expect } from 'vitest';
import { FloorFinishNode } from './floor-finish.node';
import { createTestContext } from '../test-utils';

describe('FloorFinishNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      floorArea: undefined
    } as any;
    const params = {
      material: "tile",
      pattern: "straight"
    } as any;

    const result = await FloorFinishNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
