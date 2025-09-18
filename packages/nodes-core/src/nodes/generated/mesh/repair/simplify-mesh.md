
# SimplifyMesh Node

**Category:** Mesh / Repair

Reduce mesh complexity

## Parameters


### targetRatio
- **Type:** number
- **Default:** 0.5
- **Min:** 0.01
- **Max:** 1
- **Description:** Target triangle ratio


### preserveBoundaries
- **Type:** boolean
- **Default:** true





### preserveTopology
- **Type:** boolean
- **Default:** false





### maxError
- **Type:** number
- **Default:** 0.1
- **Min:** 0.001
- **Max:** 10



## Inputs


### mesh
- **Type:** Mesh
- **Required:** Yes



## Outputs


### simplified
- **Type:** Mesh



### triangleCount
- **Type:** number




