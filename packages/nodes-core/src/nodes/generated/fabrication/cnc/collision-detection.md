
# CollisionDetection Node

**Category:** Fabrication / CNC

Tool collision checking

## Parameters


### toolLength
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 200



### holderDiameter
- **Type:** number
- **Default:** 20
- **Min:** 5
- **Max:** 100



## Inputs


### toolpath
- **Type:** Wire[]
- **Required:** Yes



### model
- **Type:** Shape
- **Required:** Yes



## Outputs


### collisions
- **Type:** Point[]



### safePath
- **Type:** Wire[]




