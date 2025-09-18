
# WebSocketClient Node

**Category:** Interoperability / Streaming

Connect to WebSocket data streams

## Parameters


### url
- **Type:** string
- **Default:** ""


- **Description:** WebSocket server URL


### reconnect
- **Type:** boolean
- **Default:** true





### heartbeat
- **Type:** number
- **Default:** 30
- **Min:** 0
- **Max:** 300
- **Description:** Heartbeat interval


## Inputs


### message
- **Type:** string
- **Required:** No



## Outputs


### connected
- **Type:** boolean



### messages
- **Type:** string[]



### lastMessage
- **Type:** string




