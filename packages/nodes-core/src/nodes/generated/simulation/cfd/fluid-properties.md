
# FluidProperties Node

**Category:** Simulation / CFD

Set fluid properties

## Parameters


### fluid
- **Type:** enum
- **Default:** "air"





### density
- **Type:** number
- **Default:** 1.225
- **Min:** 0.001
- **Max:** 20000
- **Description:** kg/m³


### viscosity
- **Type:** number
- **Default:** 0.0000181
- **Min:** 1e-10
- **Max:** 100
- **Description:** Pa·s


### compressible
- **Type:** boolean
- **Default:** false





## Inputs


### domain
- **Type:** Shape
- **Required:** Yes



## Outputs


### fluidDomain
- **Type:** Shape



### fluidData
- **Type:** Data




