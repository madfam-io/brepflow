
# PointCloudProcessing Node

**Category:** Algorithmic / Geometry

Process and filter point clouds

## Parameters


### operation
- **Type:** enum
- **Default:** "filter"





### radius
- **Type:** number
- **Default:** 1
- **Min:** 0.1
- **Max:** 10



### neighbors
- **Type:** number
- **Default:** 6
- **Min:** 3
- **Max:** 50



## Inputs


### points
- **Type:** Point[]
- **Required:** Yes



## Outputs


### processed
- **Type:** Point[]



### normals
- **Type:** Vector[]



### indices
- **Type:** number[]




