
# ContinuityCheck Node

**Category:** Surface / Analysis

Check surface continuity

## Parameters


### checkType
- **Type:** enum
- **Default:** "G1"





### tolerance
- **Type:** number
- **Default:** 0.01
- **Min:** 0.0001
- **Max:** 1



## Inputs


### surface1
- **Type:** Face
- **Required:** Yes



### surface2
- **Type:** Face
- **Required:** Yes



### edge
- **Type:** Edge
- **Required:** No



## Outputs


### isContinuous
- **Type:** boolean



### deviations
- **Type:** Data




