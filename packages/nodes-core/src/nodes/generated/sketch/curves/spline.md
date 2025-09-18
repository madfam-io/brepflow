
# Spline Node

**Category:** Sketch / Curves

Create a spline curve through points

## Parameters


### degree
- **Type:** number
- **Default:** 3
- **Min:** 1
- **Max:** 10
- **Description:** Spline degree


### closed
- **Type:** boolean
- **Default:** false


- **Description:** Close the spline


### smooth
- **Type:** boolean
- **Default:** true


- **Description:** Smooth tangents


## Inputs


### points
- **Type:** Point[]
- **Required:** Yes
- **Description:** Control points


### tangents
- **Type:** Vector[]
- **Required:** No
- **Description:** Optional tangent vectors


## Outputs


### curve
- **Type:** Wire
- **Description:** Spline curve



