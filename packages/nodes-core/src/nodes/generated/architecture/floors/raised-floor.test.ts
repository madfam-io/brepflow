
import { describe, it, expect } from 'vitest';
import { RaisedFloorNode } from './raisedfloor-node';
import { createTestContext } from '../test-utils';

describe('RaisedFloorNode', () => {
  it('should create RaisedFloor', async () => {
    const context = createTestContext();
    const inputs = {
      roomBoundary: /* test value */
    };
    const params = {
      height: 300,
      panelSize: 600,
      loadRating: 1250
    };

    const result = await RaisedFloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.raisedFloor).toBeDefined();
    expect(result.pedestals).toBeDefined();
    expect(result.panels).toBeDefined();
  });

  
});