
import { describe, it, expect } from 'vitest';
import { PartingLineDraftNode } from './partinglinedraft-node';
import { createTestContext } from '../test-utils';

describe('PartingLineDraftNode', () => {
  it('should create PartingLineDraft', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */,
      partingEdges: /* test value */
    };
    const params = {
      upperAngle: 3,
      lowerAngle: 3,
      pullDirection: [0,0,1]
    };

    const result = await PartingLineDraftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.drafted).toBeDefined();
  });

  
});