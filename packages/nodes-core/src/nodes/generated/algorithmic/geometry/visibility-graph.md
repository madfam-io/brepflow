
# VisibilityGraph Node

**Category:** Algorithmic / Geometry

Compute visibility graph for path planning

## Parameters


### epsilon
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1



### includeInterior
- **Type:** boolean
- **Default:** false





## Inputs


### obstacles
- **Type:** Shape[]
- **Required:** Yes



### start
- **Type:** Point
- **Required:** Yes



### goal
- **Type:** Point
- **Required:** Yes



## Outputs


### graph
- **Type:** Wire[]



### vertices
- **Type:** Point[]



### edges
- **Type:** Properties[]




