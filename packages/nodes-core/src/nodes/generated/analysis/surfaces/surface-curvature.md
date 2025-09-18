
# SurfaceCurvature Node

**Category:** Analysis / Surfaces

Analyze surface curvature (Gaussian and Mean)

## Parameters


### uSamples
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 200



### vSamples
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 200



### curvatureType
- **Type:** enum
- **Default:** "gaussian"





### colorMap
- **Type:** boolean
- **Default:** true





## Inputs


### surface
- **Type:** Face
- **Required:** Yes



## Outputs


### curvatureMap
- **Type:** Shape



### maxCurvature
- **Type:** number



### minCurvature
- **Type:** number



### averageCurvature
- **Type:** number




