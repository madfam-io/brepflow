
# FieldStreamLines Node

**Category:** Fields / Visualization

Generate streamlines through vector field

## Parameters


### seedCount
- **Type:** number
- **Default:** 20
- **Min:** 1
- **Max:** 1000
- **Description:** Number of streamlines


### stepSize
- **Type:** number
- **Default:** 0.1
- **Min:** 0.01
- **Max:** 1
- **Description:** Integration step size


### maxSteps
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 1000
- **Description:** Maximum steps per line


## Inputs


### field
- **Type:** VectorField
- **Required:** No



### seedPoints
- **Type:** PointSet
- **Required:** No



## Outputs


### streamlines
- **Type:** CurveSet




