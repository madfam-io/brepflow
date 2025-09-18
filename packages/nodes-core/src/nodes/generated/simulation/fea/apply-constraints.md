
# ApplyConstraints Node

**Category:** Simulation / FEA

Define boundary conditions

## Parameters


### constraintType
- **Type:** enum
- **Default:** "fixed"





### dof
- **Type:** boolean[]
- **Default:** [true,true,true,true,true,true]


- **Description:** X,Y,Z,RX,RY,RZ


## Inputs


### mesh
- **Type:** Mesh
- **Required:** Yes



### constraintFaces
- **Type:** Face[]
- **Required:** Yes



## Outputs


### constrainedMesh
- **Type:** Mesh



### constraintData
- **Type:** Data




