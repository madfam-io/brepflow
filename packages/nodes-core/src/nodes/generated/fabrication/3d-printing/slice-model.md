
# SliceModel Node

**Category:** Fabrication / 3D Printing

Slice model for printing

## Parameters


### layerHeight
- **Type:** number
- **Default:** 0.2
- **Min:** 0.05
- **Max:** 1



### infillDensity
- **Type:** number
- **Default:** 0.2
- **Min:** 0
- **Max:** 1



### infillPattern
- **Type:** enum
- **Default:** "grid"





## Inputs


### model
- **Type:** Shape
- **Required:** Yes



## Outputs


### slices
- **Type:** Wire[]



### infill
- **Type:** Wire[]




