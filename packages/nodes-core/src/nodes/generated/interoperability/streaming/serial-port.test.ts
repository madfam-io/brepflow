
import { describe, it, expect } from 'vitest';
import { SerialPortNode } from './serial-port.node';
import { createTestContext } from '../test-utils';

describe('SerialPortNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      port: "COM1",
      baudRate: "9600",
      dataBits: "8",
      parity: "none"
    } as any;

    const result = await SerialPortNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
