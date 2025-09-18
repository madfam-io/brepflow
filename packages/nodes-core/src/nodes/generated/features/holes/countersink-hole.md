
# CountersinkHole Node

**Category:** Features / Holes

Creates a countersink hole for flat head screws

## Parameters


### holeDiameter
- **Type:** number
- **Default:** 6.5
- **Min:** 0.1
- **Max:** 100



### countersinkDiameter
- **Type:** number
- **Default:** 12
- **Min:** 0.1
- **Max:** 200



### angle
- **Type:** enum
- **Default:** "90"


- **Description:** Countersink angle in degrees


### depth
- **Type:** number
- **Default:** -1
- **Min:** -1




## Inputs


### solid
- **Type:** Shape
- **Required:** Yes



### position
- **Type:** Point
- **Required:** Yes



## Outputs


### shape
- **Type:** Shape




