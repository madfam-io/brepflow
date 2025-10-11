
import { describe, it, expect } from 'vitest';
import { Text3DNode } from './text3-d.node';
import { createTestContext } from '../test-utils';

describe('Text3DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      text: "HELLO",
      font: "Arial",
      size: 20,
      height: 5,
      bold: false,
      italic: false
    } as any;

    const result = await Text3DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
