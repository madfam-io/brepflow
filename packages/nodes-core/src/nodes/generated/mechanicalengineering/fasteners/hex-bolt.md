
# HexBolt Node

**Category:** MechanicalEngineering / Fasteners

Create hex head bolt

## Parameters


### diameter
- **Type:** enum
- **Default:** "M6"





### length
- **Type:** number
- **Default:** 20
- **Min:** 5
- **Max:** 200
- **Description:** Length in mm


### threadPitch
- **Type:** number
- **Default:** 1
- **Min:** 0.5
- **Max:** 3



### headHeight
- **Type:** number
- **Default:** 4
- **Min:** 2
- **Max:** 20



## Inputs


### position
- **Type:** Point
- **Required:** Yes



### direction
- **Type:** Vector
- **Required:** No



## Outputs


### bolt
- **Type:** Shape



### thread
- **Type:** Wire




