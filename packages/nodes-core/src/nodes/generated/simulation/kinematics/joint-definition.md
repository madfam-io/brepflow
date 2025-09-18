
# JointDefinition Node

**Category:** Simulation / Kinematics

Define kinematic joint

## Parameters


### jointType
- **Type:** enum
- **Default:** "revolute"





### axis
- **Type:** vector3
- **Default:** [0,0,1]





### minLimit
- **Type:** number
- **Default:** -180
- **Min:** -360
- **Max:** 360



### maxLimit
- **Type:** number
- **Default:** 180
- **Min:** -360
- **Max:** 360



## Inputs


### body1
- **Type:** Shape
- **Required:** Yes



### body2
- **Type:** Shape
- **Required:** Yes



### jointLocation
- **Type:** Point
- **Required:** Yes



## Outputs


### joint
- **Type:** Data



### assembly
- **Type:** Shape




