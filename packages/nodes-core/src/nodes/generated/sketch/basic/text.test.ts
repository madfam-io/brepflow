
import { describe, it, expect } from 'vitest';
import { TextNode } from './text.node';
import { createTestContext } from '../test-utils';

describe('TextNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      text: "Text",
      font: "Arial",
      size: 20,
      bold: false,
      italic: false,
      x: 0,
      y: 0
    } as any;

    const result = await TextNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
