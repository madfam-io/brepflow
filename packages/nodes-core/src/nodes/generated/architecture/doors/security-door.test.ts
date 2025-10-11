
import { describe, it, expect } from 'vitest';
import { SecurityDoorNode } from './security-door.node';
import { createTestContext } from '../test-utils';

describe('SecurityDoorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      level: "high",
      accessControl: "card"
    } as any;

    const result = await SecurityDoorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
