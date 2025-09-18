
# Deform Node

**Category:** Advanced / Features

Point deformation

## Parameters


### deformType
- **Type:** enum
- **Default:** "point"





### radius
- **Type:** number
- **Default:** 50
- **Min:** 0.1
- **Max:** 1000



### stiffness
- **Type:** number
- **Default:** 0.5
- **Min:** 0
- **Max:** 1



## Inputs


### shape
- **Type:** Shape
- **Required:** Yes



### controlPoints
- **Type:** Point[]
- **Required:** Yes



### targetPoints
- **Type:** Point[]
- **Required:** Yes



## Outputs


### deformed
- **Type:** Shape




