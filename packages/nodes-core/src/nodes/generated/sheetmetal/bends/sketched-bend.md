
# SketchedBend Node

**Category:** SheetMetal / Bends

Create bend from sketch line

## Parameters


### angle
- **Type:** number
- **Default:** 90
- **Min:** -180
- **Max:** 180



### bendRadius
- **Type:** number
- **Default:** 3
- **Min:** 0.1
- **Max:** 100



### bendDirection
- **Type:** enum
- **Default:** "up"





### bendAllowance
- **Type:** number
- **Default:** 0
- **Min:** -10
- **Max:** 10



## Inputs


### sheet
- **Type:** Shape
- **Required:** Yes



### bendLine
- **Type:** Edge
- **Required:** Yes



## Outputs


### result
- **Type:** Shape




