
import { describe, it, expect, vi } from 'vitest';
import { CircularPatternNode } from './circular-pattern.node';
import { createTestContext } from './../../test-utils';

describe('CircularPatternNode', () => {
  it('should create CircularPattern', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({
      shapes: [{ id: 'instance-1' }],
      compound: { id: 'compound-1' }
    });
    context.geometry.execute = executeSpy;

    const shape = { id: 'shape-1' } as any;
    const params = {
      count: 6,
      angle: 360,
      center: [0, 0, 0] as [number, number, number],
      axis: [0, 0, 1] as [number, number, number],
      rotateInstances: true
    } as any;

    const result = await CircularPatternNode.evaluate(context as any, { shape } as any, params);

    expect(executeSpy).toHaveBeenCalledWith({
      type: 'CREATE_CIRCULAR_PATTERN',
      params: {
        shape,
        count: 6,
        angle: 360,
        center: { x: 0, y: 0, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        rotateInstances: true,
        keepOriginal: true
      }
    });

    expect(result).toEqual({
      shapes: [{ id: 'instance-1' }],
      compound: { id: 'compound-1' }
    });
  });

  
  it('should handle Bolt Circle', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({ shapes: [] });
    context.geometry.execute = executeSpy;

    const params = {
      count: 8,
      angle: 360,
      rotateInstances: false
    } as any;

    await CircularPatternNode.evaluate(context as any, { shape: { id: 'shape-1' } } as any, params);

    expect(executeSpy).toHaveBeenCalledWith(expect.objectContaining({
      params: expect.objectContaining({ rotateInstances: false })
    }));
  });
  
  it('should handle Turbine Blades', async () => {
    const context = createTestContext();
    const executeSpy = vi.fn().mockResolvedValue({ shapes: Array(24).fill({}) });
    context.geometry.execute = executeSpy;

    const params = {
      count: 24,
      angle: 360,
      rotateInstances: true
    } as any;

    await CircularPatternNode.evaluate(context as any, { shape: { id: 'shape-1' } } as any, params);

    expect(executeSpy).toHaveBeenCalled();
  });
});
