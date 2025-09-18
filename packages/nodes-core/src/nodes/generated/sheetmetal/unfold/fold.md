
# Fold Node

**Category:** SheetMetal / Unfold

Fold flat pattern to 3D

## Parameters


### foldSequence
- **Type:** string
- **Default:** "auto"


- **Description:** Bend sequence order


### partialFold
- **Type:** number
- **Default:** 1
- **Min:** 0
- **Max:** 1
- **Description:** Fold completion ratio


## Inputs


### flatPattern
- **Type:** Shape
- **Required:** Yes



### bendLines
- **Type:** Edge[]
- **Required:** Yes



### bendAngles
- **Type:** number[]
- **Required:** Yes



## Outputs


### foldedShape
- **Type:** Shape




