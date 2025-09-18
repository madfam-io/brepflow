
# ApplyLoads Node

**Category:** Simulation / FEA

Define load conditions

## Parameters


### loadType
- **Type:** enum
- **Default:** "force"





### magnitude
- **Type:** number
- **Default:** 1000
- **Min:** 0
- **Max:** 1000000



### direction
- **Type:** vector3
- **Default:** [0,0,-1]





### units
- **Type:** enum
- **Default:** "N"





## Inputs


### mesh
- **Type:** Mesh
- **Required:** Yes



### applicationFaces
- **Type:** Face[]
- **Required:** Yes



## Outputs


### loadedMesh
- **Type:** Mesh



### loadData
- **Type:** Data




