
import { describe, it, expect } from 'vitest';
import { SecurityDoorNode } from './securitydoor-node';
import { createTestContext } from '../test-utils';

describe('SecurityDoorNode', () => {
  it('should create SecurityDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: null
    };
    const params = {
      level: "high",
      accessControl: "card"
    };

    const result = await SecurityDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.securityDoor).toBeDefined();
  });

  
});