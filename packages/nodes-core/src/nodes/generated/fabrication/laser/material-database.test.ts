
import { describe, it, expect } from 'vitest';
import { MaterialDatabaseNode } from './materialdatabase.node';
import { createTestContext } from './../../test-utils';

describe('MaterialDatabaseNode', () => {
  it('should create MaterialDatabase', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      material: "acrylic",
      thickness: 3
    };

    const result = await MaterialDatabaseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cuttingSpeed).toBeDefined();
    expect(result.power).toBeDefined();
    expect(result.frequency).toBeDefined();
  });

  
});