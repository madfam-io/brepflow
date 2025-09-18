
# Fillet2D Node

**Category:** Sketch / Curves

Fillet corners of a 2D shape

## Parameters


### radius
- **Type:** number
- **Default:** 5
- **Min:** 0.1
- **Max:** 1000



### allCorners
- **Type:** boolean
- **Default:** true





## Inputs


### wire
- **Type:** Wire
- **Required:** Yes
- **Description:** Wire to fillet


### vertices
- **Type:** Vertex[]
- **Required:** No
- **Description:** Specific vertices to fillet


## Outputs


### filleted
- **Type:** Wire
- **Description:** Filleted wire



