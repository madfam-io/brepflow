
# InletOutlet Node

**Category:** Simulation / CFD

Define inlet/outlet conditions

## Parameters


### boundaryType
- **Type:** enum
- **Default:** "velocity-inlet"





### velocity
- **Type:** number
- **Default:** 1
- **Min:** 0
- **Max:** 1000
- **Description:** m/s


### pressure
- **Type:** number
- **Default:** 101325
- **Min:** 0
- **Max:** 10000000
- **Description:** Pa


### temperature
- **Type:** number
- **Default:** 293
- **Min:** 0
- **Max:** 1000
- **Description:** K


## Inputs


### mesh
- **Type:** Mesh
- **Required:** Yes



### boundaryFaces
- **Type:** Face[]
- **Required:** Yes



## Outputs


### boundaryMesh
- **Type:** Mesh



### boundaryData
- **Type:** Data




