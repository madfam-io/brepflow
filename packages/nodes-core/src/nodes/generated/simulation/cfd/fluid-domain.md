
# FluidDomain Node

**Category:** Simulation / CFD

Create fluid domain

## Parameters


### domainType
- **Type:** enum
- **Default:** "external"





### boundingBoxScale
- **Type:** vector3
- **Default:** [3,3,3]


- **Description:** Domain size multiplier


### refinementDistance
- **Type:** number
- **Default:** 10
- **Min:** 1
- **Max:** 1000



## Inputs


### geometry
- **Type:** Shape
- **Required:** Yes



## Outputs


### fluidDomain
- **Type:** Shape



### walls
- **Type:** Face[]




