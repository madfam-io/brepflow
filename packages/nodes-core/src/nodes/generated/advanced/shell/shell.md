
# Shell Node

**Category:** Advanced / Shell

Hollow out solid

## Parameters


### thickness
- **Type:** number
- **Default:** 2
- **Min:** 0.01
- **Max:** 1000
- **Description:** Wall thickness


### direction
- **Type:** enum
- **Default:** "inward"





### tolerance
- **Type:** number
- **Default:** 0.01
- **Min:** 0.0001
- **Max:** 1



## Inputs


### solid
- **Type:** Shape
- **Required:** Yes



### facesToRemove
- **Type:** Face[]
- **Required:** Yes



## Outputs


### shell
- **Type:** Shape




