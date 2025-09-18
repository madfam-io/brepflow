
import { describe, it, expect } from 'vitest';
import { TiltUpPanelNode } from './tiltuppanel-node';
import { createTestContext } from '../test-utils';

describe('TiltUpPanelNode', () => {
  it('should create TiltUpPanel', async () => {
    const context = createTestContext();
    const inputs = {
      panelOutline: /* test value */
    };
    const params = {
      panelThickness: 200,
      reinforcement: true
    };

    const result = await TiltUpPanelNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.panel).toBeDefined();
    expect(result.liftingPoints).toBeDefined();
  });

  
});