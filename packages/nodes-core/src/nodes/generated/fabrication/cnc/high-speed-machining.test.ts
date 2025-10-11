
import { describe, it, expect } from 'vitest';
import { HighSpeedMachiningNode } from './high-speed-machining.node';
import { createTestContext } from '../test-utils';

describe('HighSpeedMachiningNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: undefined
    } as any;
    const params = {
      cornerRadius: 2,
      entrySpeed: 0.5
    } as any;

    const result = await HighSpeedMachiningNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
