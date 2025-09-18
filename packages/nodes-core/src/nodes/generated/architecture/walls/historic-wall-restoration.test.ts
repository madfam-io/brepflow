
import { describe, it, expect } from 'vitest';
import { HistoricWallRestorationNode } from './historicwallrestoration-node';
import { createTestContext } from '../test-utils';

describe('HistoricWallRestorationNode', () => {
  it('should create HistoricWallRestoration', async () => {
    const context = createTestContext();
    const inputs = {
      existingWall: /* test value */
    };
    const params = {
      period: "victorian",
      preservationLevel: "preserve"
    };

    const result = await HistoricWallRestorationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.restoredWall).toBeDefined();
  });

  
});