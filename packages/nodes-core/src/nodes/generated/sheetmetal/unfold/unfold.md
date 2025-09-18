
# Unfold Node

**Category:** SheetMetal / Unfold

Unfold sheet metal to flat pattern

## Parameters


### kFactor
- **Type:** number
- **Default:** 0.44
- **Min:** 0
- **Max:** 1
- **Description:** Neutral axis position


### bendAllowance
- **Type:** number
- **Default:** 0
- **Min:** -10
- **Max:** 10



### autoRelief
- **Type:** boolean
- **Default:** true





## Inputs


### foldedShape
- **Type:** Shape
- **Required:** Yes



### fixedFace
- **Type:** Face
- **Required:** No
- **Description:** Face to keep fixed


## Outputs


### flatPattern
- **Type:** Shape



### bendLines
- **Type:** Edge[]



### bendTable
- **Type:** Data
- **Description:** Bend sequence information



