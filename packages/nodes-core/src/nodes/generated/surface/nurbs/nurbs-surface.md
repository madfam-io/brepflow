
# NurbsSurface Node

**Category:** Surface / NURBS

Create NURBS surface from control points

## Parameters


### degreeU
- **Type:** number
- **Default:** 3
- **Min:** 1
- **Max:** 10



### degreeV
- **Type:** number
- **Default:** 3
- **Min:** 1
- **Max:** 10



### periodicU
- **Type:** boolean
- **Default:** false





### periodicV
- **Type:** boolean
- **Default:** false





## Inputs


### controlPoints
- **Type:** Point[][]
- **Required:** Yes



### weights
- **Type:** number[][]
- **Required:** No



### knotsU
- **Type:** number[]
- **Required:** No



### knotsV
- **Type:** number[]
- **Required:** No



## Outputs


### surface
- **Type:** Face




