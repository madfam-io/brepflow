
import { describe, it, expect } from 'vitest';
import { SocketHeadCapScrewNode } from './socketheadcapscrew.node';
import { createTestContext } from './../../test-utils';

describe('SocketHeadCapScrewNode', () => {
  it('should create SocketHeadCapScrew', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      diameter: "M5",
      length: 16,
      socketSize: 4,
      headDiameter: 8.5
    };

    const result = await SocketHeadCapScrewNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.screw).toBeDefined();
    expect(result.socket).toBeDefined();
  });

  
});