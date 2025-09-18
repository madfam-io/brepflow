
# ForwardKinematics Node

**Category:** Simulation / Kinematics

Calculate forward kinematics

## Parameters


### timeStep
- **Type:** number
- **Default:** 0.01
- **Min:** 0.0001
- **Max:** 1



### duration
- **Type:** number
- **Default:** 1
- **Min:** 0.01
- **Max:** 100



## Inputs


### mechanism
- **Type:** Data
- **Required:** Yes



### jointValues
- **Type:** number[]
- **Required:** Yes



## Outputs


### endEffectorPose
- **Type:** Data



### trajectory
- **Type:** Wire




