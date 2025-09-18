
# MaterialAssign Node

**Category:** Simulation / FEA

Assign material properties

## Parameters


### material
- **Type:** enum
- **Default:** "steel"





### youngsModulus
- **Type:** number
- **Default:** 200000
- **Min:** 1
- **Max:** 1000000
- **Description:** MPa


### poissonsRatio
- **Type:** number
- **Default:** 0.3
- **Min:** 0
- **Max:** 0.5



### density
- **Type:** number
- **Default:** 7850
- **Min:** 1
- **Max:** 20000
- **Description:** kg/m³


### yieldStrength
- **Type:** number
- **Default:** 250
- **Min:** 1
- **Max:** 5000
- **Description:** MPa


## Inputs


### mesh
- **Type:** Mesh
- **Required:** Yes



### bodies
- **Type:** Shape[]
- **Required:** No



## Outputs


### materializedMesh
- **Type:** Mesh



### materialData
- **Type:** Data




