
# FloorDrainage Node

**Category:** Architecture / Floors

Floor drainage system

## Parameters


### slope
- **Type:** number
- **Default:** 0.01
- **Min:** 0.005
- **Max:** 0.02



### drainType
- **Type:** enum
- **Default:** "point"





## Inputs


### floorBoundary
- **Type:** Wire
- **Required:** Yes



### drainLocations
- **Type:** Point[]
- **Required:** Yes



## Outputs


### slopedFloor
- **Type:** Shape



### drains
- **Type:** Shape[]




