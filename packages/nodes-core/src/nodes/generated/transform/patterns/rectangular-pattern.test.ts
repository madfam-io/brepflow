
import { describe, it, expect, vi } from 'vitest';
import { RectangularPatternNode } from './rectangular-pattern.node';
import { createTestContext } from './../../test-utils';

describe('RectangularPatternNode', () => {
  it('should create RectangularPattern', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({
      shapes: [{ id: 'instance-1' }, { id: 'instance-2' }],
      compound: { id: 'compound-1' }
    });
    context.geometry.execute = executeSpy;

    const shape = { id: 'shape-1' } as any;
    const params = {
      countX: 4,
      countY: 3,
      spacingX: 20,
      spacingY: 20,
      staggered: true
    } as any;

    const result = await RectangularPatternNode.evaluate(context as any, { shape } as any, params);

    expect(executeSpy).toHaveBeenCalledWith({
      type: 'CREATE_RECTANGULAR_PATTERN',
      params: {
        shape,
        countX: 4,
        countY: 3,
        spacingX: 20,
        spacingY: 20,
        staggered: true,
        keepOriginal: true
      }
    });

    expect(result).toEqual({
      shapes: [{ id: 'instance-1' }, { id: 'instance-2' }],
      compound: { id: 'compound-1' }
    });
  });

  
});
