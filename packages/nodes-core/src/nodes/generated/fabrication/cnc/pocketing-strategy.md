
# PocketingStrategy Node

**Category:** Fabrication / CNC

Pocket machining strategy

## Parameters


### pattern
- **Type:** enum
- **Default:** "spiral"





### stepdown
- **Type:** number
- **Default:** 2
- **Min:** 0.1
- **Max:** 10



### finishPass
- **Type:** boolean
- **Default:** true





## Inputs


### pocket
- **Type:** Wire
- **Required:** Yes



### depth
- **Type:** Number
- **Required:** Yes



## Outputs


### roughing
- **Type:** Wire[]



### finishing
- **Type:** Wire[]




