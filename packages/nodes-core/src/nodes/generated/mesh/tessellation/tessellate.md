
# Tessellate Node

**Category:** Mesh / Tessellation

Convert shape to mesh

## Parameters


### linearDeflection
- **Type:** number
- **Default:** 0.1
- **Min:** 0.001
- **Max:** 10
- **Description:** Maximum deviation from true surface


### angularDeflection
- **Type:** number
- **Default:** 0.5
- **Min:** 0.01
- **Max:** 1
- **Description:** Angular deflection in radians


### relative
- **Type:** boolean
- **Default:** false


- **Description:** Use relative deflection


### qualityNormals
- **Type:** boolean
- **Default:** true





## Inputs


### shape
- **Type:** Shape
- **Required:** Yes



## Outputs


### mesh
- **Type:** Mesh



### triangleCount
- **Type:** number



### vertexCount
- **Type:** number




