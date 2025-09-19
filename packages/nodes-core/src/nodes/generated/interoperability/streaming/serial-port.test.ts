
import { describe, it, expect } from 'vitest';
import { SerialPortNode } from './serialport.node';
import { createTestContext } from './../../test-utils';

describe('SerialPortNode', () => {
  it('should create SerialPort', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      port: "COM1",
      baudRate: "9600",
      dataBits: "8",
      parity: "none"
    };

    const result = await SerialPortNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.connected).toBeDefined();
    expect(result.received).toBeDefined();
    expect(result.buffer).toBeDefined();
  });

  
});