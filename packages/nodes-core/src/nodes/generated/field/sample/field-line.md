
# FieldLine Node

**Category:** Field / Sample

Create field lines

## Parameters


### stepSize
- **Type:** number
- **Default:** 1
- **Min:** 0.01




### maxSteps
- **Type:** number
- **Default:** 1000
- **Min:** 10
- **Max:** 10000



### direction
- **Type:** enum
- **Default:** "forward"





## Inputs


### field
- **Type:** VectorField
- **Required:** Yes



### seeds
- **Type:** Point[]
- **Required:** Yes



## Outputs


### lines
- **Type:** Wire[]




