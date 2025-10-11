
import { describe, it, expect } from 'vitest';
import { MaterialDatabaseNode } from './material-database.node';
import { createTestContext } from '../test-utils';

describe('MaterialDatabaseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      material: "acrylic",
      thickness: 3
    } as any;

    const result = await MaterialDatabaseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
