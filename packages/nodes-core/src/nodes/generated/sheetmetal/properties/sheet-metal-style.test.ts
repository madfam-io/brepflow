
import { describe, it, expect } from 'vitest';
import { SheetMetalStyleNode } from './sheetmetalstyle.node';
import { createTestContext } from './../../test-utils';

describe('SheetMetalStyleNode', () => {
  it('should create SheetMetalStyle', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      thickness: 2,
      material: "steel",
      kFactor: 0.44,
      minBendRadius: 2,
      reliefType: "rectangular"
    };

    const result = await SheetMetalStyleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.style).toBeDefined();
  });

  
});