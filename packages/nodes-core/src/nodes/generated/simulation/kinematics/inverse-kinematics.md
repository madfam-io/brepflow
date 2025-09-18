
# InverseKinematics Node

**Category:** Simulation / Kinematics

Calculate inverse kinematics

## Parameters


### solver
- **Type:** enum
- **Default:** "jacobian"





### maxIterations
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 1000



### tolerance
- **Type:** number
- **Default:** 0.001
- **Min:** 0.0001
- **Max:** 0.1



## Inputs


### mechanism
- **Type:** Data
- **Required:** Yes



### targetPose
- **Type:** Data
- **Required:** Yes



## Outputs


### jointValues
- **Type:** number[]



### reachable
- **Type:** boolean




