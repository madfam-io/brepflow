
# SurfaceContinuity Node

**Category:** Analysis / Surfaces

Analyze surface continuity across edges

## Parameters


### continuityType
- **Type:** enum
- **Default:** "G1"





### tolerance
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1



### showAnalysis
- **Type:** boolean
- **Default:** true





## Inputs


### surface1
- **Type:** Face
- **Required:** Yes



### surface2
- **Type:** Face
- **Required:** Yes



## Outputs


### isContinuous
- **Type:** boolean



### discontinuityPoints
- **Type:** Point[]



### analysisLines
- **Type:** Wire[]




