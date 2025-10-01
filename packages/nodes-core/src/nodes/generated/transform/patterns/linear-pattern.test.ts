
import { describe, it, expect, vi } from 'vitest';
import { LinearPatternNode } from './linear-pattern.node';
import { createTestContext } from './../../test-utils';

describe('LinearPatternNode', () => {
  it('should create LinearPattern', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({
      shapes: [{ id: 'instance-1' }],
      compound: { id: 'compound-1' }
    });
    context.geometry.execute = executeSpy;

    const shape = { id: 'shape-1' } as any;
    const inputs = { shape } as any;
    const params = {
      count: 5,
      spacing: 20,
      direction: [1, 0, 0] as [number, number, number],
      centered: false
    } as any;

    const result = await LinearPatternNode.evaluate(context as any, inputs, params);

    expect(executeSpy).toHaveBeenCalledWith({
      type: 'CREATE_LINEAR_PATTERN',
      params: {
        shape,
        count: 5,
        spacing: 20,
        direction: { x: 1, y: 0, z: 0 },
        centered: false,
        keepOriginal: true
      }
    });

    expect(result).toEqual({
      shapes: [{ id: 'instance-1' }],
      compound: { id: 'compound-1' }
    });
  });

  
  it('should handle Hole Pattern', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({ shapes: [] });
    context.geometry.execute = executeSpy;

    const params = {
      count: 10,
      spacing: 15,
      direction: [1, 0, 0] as [number, number, number],
      centered: true
    } as any;

    await LinearPatternNode.evaluate(context as any, { shape: { id: 'shape-1' } } as any, params);

    expect(executeSpy).toHaveBeenCalledWith({
      type: 'CREATE_LINEAR_PATTERN',
      params: expect.objectContaining({
        centered: true
      })
    });
  });
  
  it('should handle Centered Array', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({ shapes: [], compound: null });
    context.geometry.execute = executeSpy;

    const params = {
      count: 7,
      spacing: 25,
      direction: [0, 1, 0] as [number, number, number],
      centered: true
    } as any;

    await LinearPatternNode.evaluate(context as any, { shape: { id: 'shape-1' } } as any, params);

    expect(executeSpy).toHaveBeenCalled();
  });
});
