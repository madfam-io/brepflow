
import { describe, it, expect } from 'vitest';
import { EllipseNode } from './ellipse.node';
import { createTestContext } from './../../test-utils';

describe('EllipseNode', () => {
  it('should create Ellipse', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      majorRadius: 100,
      minorRadius: 50,
      startAngle: 0,
      endAngle: 360
    };

    const result = await EllipseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});