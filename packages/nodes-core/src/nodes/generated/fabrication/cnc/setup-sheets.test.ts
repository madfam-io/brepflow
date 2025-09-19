
import { describe, it, expect } from 'vitest';
import { SetupSheetsNode } from './setupsheets.node';
import { createTestContext } from './../../test-utils';

describe('SetupSheetsNode', () => {
  it('should create SetupSheets', async () => {
    const context = createTestContext();
    const inputs = {
      operations: null
    };
    const params = {
      includeToolList: true,
      includeFixtures: true
    };

    const result = await SetupSheetsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.setupDocument).toBeDefined();
  });

  
});