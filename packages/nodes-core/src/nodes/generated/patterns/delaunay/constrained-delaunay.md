
# ConstrainedDelaunay Node

**Category:** Patterns / Delaunay

Constrained Delaunay triangulation

## Parameters


### refinement
- **Type:** boolean
- **Default:** true





### maxArea
- **Type:** number
- **Default:** 100
- **Min:** 0.1




## Inputs


### points
- **Type:** Point[]
- **Required:** Yes



### boundary
- **Type:** Wire
- **Required:** Yes



### holes
- **Type:** Wire[]
- **Required:** No



## Outputs


### triangulation
- **Type:** Mesh




