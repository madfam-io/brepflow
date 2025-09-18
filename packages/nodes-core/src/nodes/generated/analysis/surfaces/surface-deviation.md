
# SurfaceDeviation Node

**Category:** Analysis / Surfaces

Compare surface deviation from reference

## Parameters


### samples
- **Type:** number
- **Default:** 100
- **Min:** 20
- **Max:** 500



### colorMap
- **Type:** boolean
- **Default:** true





### tolerance
- **Type:** number
- **Default:** 0.1
- **Min:** 0.001
- **Max:** 10



## Inputs


### testSurface
- **Type:** Face
- **Required:** Yes



### referenceSurface
- **Type:** Face
- **Required:** Yes



## Outputs


### deviationMap
- **Type:** Shape



### maxDeviation
- **Type:** number



### averageDeviation
- **Type:** number



### deviationPoints
- **Type:** Point[]




