
# SerialPort Node

**Category:** Interoperability / Streaming

Communicate with serial devices

## Parameters


### port
- **Type:** string
- **Default:** "COM1"


- **Description:** Serial port name


### baudRate
- **Type:** enum
- **Default:** "9600"





### dataBits
- **Type:** enum
- **Default:** "8"





### parity
- **Type:** enum
- **Default:** "none"





## Inputs


### data
- **Type:** string
- **Required:** No



## Outputs


### connected
- **Type:** boolean



### received
- **Type:** string



### buffer
- **Type:** string[]




