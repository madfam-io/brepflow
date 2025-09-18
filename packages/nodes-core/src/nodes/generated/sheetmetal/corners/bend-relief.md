
# BendRelief Node

**Category:** SheetMetal / Corners

Add bend relief cuts

## Parameters


### reliefType
- **Type:** enum
- **Default:** "rectangular"





### reliefDepth
- **Type:** number
- **Default:** 5
- **Min:** 0.1
- **Max:** 100



### reliefWidth
- **Type:** number
- **Default:** 2
- **Min:** 0.1
- **Max:** 50



## Inputs


### sheet
- **Type:** Shape
- **Required:** Yes



### bends
- **Type:** Edge[]
- **Required:** Yes



## Outputs


### result
- **Type:** Shape




