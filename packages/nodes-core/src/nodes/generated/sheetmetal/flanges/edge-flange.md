
# EdgeFlange Node

**Category:** SheetMetal / Flanges

Create flange from edge

## Parameters


### height
- **Type:** number
- **Default:** 25
- **Min:** 0.1
- **Max:** 1000
- **Description:** Flange height


### angle
- **Type:** number
- **Default:** 90
- **Min:** 0
- **Max:** 180
- **Description:** Bend angle in degrees


### bendRadius
- **Type:** number
- **Default:** 3
- **Min:** 0.1
- **Max:** 100
- **Description:** Bend radius


### bendRelief
- **Type:** enum
- **Default:** "rectangular"





### reliefRatio
- **Type:** number
- **Default:** 0.5
- **Min:** 0.1
- **Max:** 1



## Inputs


### sheet
- **Type:** Shape
- **Required:** Yes



### edge
- **Type:** Edge
- **Required:** Yes



## Outputs


### result
- **Type:** Shape




