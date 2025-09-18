
# SurfaceReconstruction Node

**Category:** Algorithmic / Geometry

Reconstruct surface from point cloud

## Parameters


### algorithm
- **Type:** enum
- **Default:** "poisson"





### depth
- **Type:** number
- **Default:** 8
- **Min:** 4
- **Max:** 12



### samples
- **Type:** number
- **Default:** 1
- **Min:** 0.1
- **Max:** 10



## Inputs


### points
- **Type:** Point[]
- **Required:** Yes



### normals
- **Type:** Vector[]
- **Required:** No



## Outputs


### surface
- **Type:** Shape



### mesh
- **Type:** Shape



### quality
- **Type:** number




