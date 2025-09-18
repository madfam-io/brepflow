
# RayIntersection Node

**Category:** Analysis / Intersection

Cast ray and find intersections

## Parameters


### tolerance
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1



### maxDistance
- **Type:** number
- **Default:** 1000
- **Min:** 1
- **Max:** 10000



## Inputs


### rayOrigin
- **Type:** Point
- **Required:** Yes



### rayDirection
- **Type:** Vector
- **Required:** Yes



### targets
- **Type:** Shape[]
- **Required:** Yes



## Outputs


### hitPoints
- **Type:** Point[]



### hitDistances
- **Type:** number[]



### hitNormals
- **Type:** Vector[]




