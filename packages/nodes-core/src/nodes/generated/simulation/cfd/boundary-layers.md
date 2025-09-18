
# BoundaryLayers Node

**Category:** Simulation / CFD

Add boundary layer mesh

## Parameters


### firstLayerHeight
- **Type:** number
- **Default:** 0.01
- **Min:** 0.0001
- **Max:** 1



### growthRate
- **Type:** number
- **Default:** 1.2
- **Min:** 1
- **Max:** 2



### numberOfLayers
- **Type:** number
- **Default:** 5
- **Min:** 1
- **Max:** 20



### transitionRatio
- **Type:** number
- **Default:** 0.5
- **Min:** 0.1
- **Max:** 1



## Inputs


### mesh
- **Type:** Mesh
- **Required:** Yes



### wallFaces
- **Type:** Face[]
- **Required:** Yes



## Outputs


### layeredMesh
- **Type:** Mesh




