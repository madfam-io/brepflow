
# ContourFlange Node

**Category:** SheetMetal / Flanges

Create flange from sketch contour

## Parameters


### angle
- **Type:** number
- **Default:** 90
- **Min:** 0
- **Max:** 180



### bendRadius
- **Type:** number
- **Default:** 3
- **Min:** 0.1
- **Max:** 100



### flangePosition
- **Type:** enum
- **Default:** "material-inside"





## Inputs


### sheet
- **Type:** Shape
- **Required:** Yes



### contour
- **Type:** Wire
- **Required:** Yes



### profile
- **Type:** Wire
- **Required:** No
- **Description:** Custom profile for flange


## Outputs


### result
- **Type:** Shape




