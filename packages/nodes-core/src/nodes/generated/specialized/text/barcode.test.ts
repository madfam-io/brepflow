
import { describe, it, expect } from 'vitest';
import { BarcodeNode } from './barcode.node';
import { createTestContext } from '../test-utils';

describe('BarcodeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      type: "QR",
      data: "123456789",
      size: 20,
      height: 0.5
    } as any;

    const result = await BarcodeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
