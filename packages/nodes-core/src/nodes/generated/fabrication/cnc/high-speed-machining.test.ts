
import { describe, it, expect } from 'vitest';
import { HighSpeedMachiningNode } from './highspeedmachining-node';
import { createTestContext } from '../test-utils';

describe('HighSpeedMachiningNode', () => {
  it('should create HighSpeedMachining', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: null
    };
    const params = {
      cornerRadius: 2,
      entrySpeed: 0.5
    };

    const result = await HighSpeedMachiningNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hsmPath).toBeDefined();
  });

  
});