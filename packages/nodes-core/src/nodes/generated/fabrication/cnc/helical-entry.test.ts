
import { describe, it, expect } from 'vitest';
import { HelicalEntryNode } from './helicalentry-node';
import { createTestContext } from '../test-utils';

describe('HelicalEntryNode', () => {
  it('should create HelicalEntry', async () => {
    const context = createTestContext();
    const inputs = {
      entryPoint: null,
      depth: null
    };
    const params = {
      helixDiameter: 10,
      helixAngle: 3
    };

    const result = await HelicalEntryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.helixPath).toBeDefined();
  });

  
});