
# GeometryMatching Node

**Category:** Algorithmic / Geometry

Match and align geometries

## Parameters


### algorithm
- **Type:** enum
- **Default:** "icp"





### tolerance
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1



### iterations
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 500



## Inputs


### source
- **Type:** Shape
- **Required:** Yes



### target
- **Type:** Shape
- **Required:** Yes



## Outputs


### transform
- **Type:** Properties



### aligned
- **Type:** Shape



### error
- **Type:** number



### correspondences
- **Type:** Properties[]




