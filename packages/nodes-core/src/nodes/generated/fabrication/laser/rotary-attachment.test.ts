
import { describe, it, expect } from 'vitest';
import { RotaryAttachmentNode } from './rotary-attachment.node';
import { createTestContext } from '../test-utils';

describe('RotaryAttachmentNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      cylindricalPattern: undefined
    } as any;
    const params = {
      diameter: 100,
      stepsPerRotation: 10000
    } as any;

    const result = await RotaryAttachmentNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
