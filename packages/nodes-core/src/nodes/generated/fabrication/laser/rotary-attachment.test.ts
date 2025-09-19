
import { describe, it, expect } from 'vitest';
import { RotaryAttachmentNode } from './rotaryattachment.node';
import { createTestContext } from './../../test-utils';

describe('RotaryAttachmentNode', () => {
  it('should create RotaryAttachment', async () => {
    const context = createTestContext();
    const inputs = {
      cylindricalPattern: null
    };
    const params = {
      diameter: 100,
      stepsPerRotation: 10000
    };

    const result = await RotaryAttachmentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.unwrappedPattern).toBeDefined();
  });

  
});