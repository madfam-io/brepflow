
# ShadowAnalysis Node

**Category:** Analysis / Proximity

Calculate shadow patterns

## Parameters


### lightType
- **Type:** enum
- **Default:** "directional"





### intensity
- **Type:** number
- **Default:** 1
- **Min:** 0.1
- **Max:** 10



## Inputs


### lightSource
- **Type:** Point
- **Required:** Yes



### lightDirection
- **Type:** Vector
- **Required:** No



### objects
- **Type:** Shape[]
- **Required:** Yes



### groundPlane
- **Type:** Face
- **Required:** Yes



## Outputs


### shadowRegions
- **Type:** Face[]



### lightRays
- **Type:** Wire[]



### illuminatedAreas
- **Type:** Face[]




