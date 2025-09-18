
# ThreadedHole Node

**Category:** Features / Holes

Creates a threaded (tapped) hole

## Parameters


### threadSize
- **Type:** enum
- **Default:** "M6"


- **Description:** Thread size


### pitch
- **Type:** number
- **Default:** 1
- **Min:** 0.25
- **Max:** 3
- **Description:** Thread pitch


### depth
- **Type:** number
- **Default:** 20
- **Min:** 1
- **Max:** 1000



### threadClass
- **Type:** enum
- **Default:** "6H"


- **Description:** Thread tolerance class


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




