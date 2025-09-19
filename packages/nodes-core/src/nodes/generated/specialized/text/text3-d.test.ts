
import { describe, it, expect } from 'vitest';
import { Text3DNode } from './text3d-node';
import { createTestContext } from './../../test-utils';

describe('Text3DNode', () => {
  it('should create Text3D', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      text: "HELLO",
      font: "Arial",
      size: 20,
      height: 5,
      bold: false,
      italic: false
    };

    const result = await Text3DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
  });

  
});