
# InfillOptimization Node

**Category:** Fabrication / 3D Printing

Adaptive infill generation

## Parameters


### minDensity
- **Type:** number
- **Default:** 0.1
- **Min:** 0
- **Max:** 1



### maxDensity
- **Type:** number
- **Default:** 0.5
- **Min:** 0
- **Max:** 1



### gradientDistance
- **Type:** number
- **Default:** 5
- **Min:** 1
- **Max:** 20



## Inputs


### model
- **Type:** Shape
- **Required:** Yes



### stressMap
- **Type:** Data
- **Required:** No



## Outputs


### adaptiveInfill
- **Type:** Wire[]




