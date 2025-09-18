
# MotionDriver Node

**Category:** Simulation / Kinematics

Define motion driver

## Parameters


### motionType
- **Type:** enum
- **Default:** "constant"





### velocity
- **Type:** number
- **Default:** 1
- **Min:** -1000
- **Max:** 1000



### acceleration
- **Type:** number
- **Default:** 0
- **Min:** -1000
- **Max:** 1000



### period
- **Type:** number
- **Default:** 1
- **Min:** 0.001
- **Max:** 100



## Inputs


### joint
- **Type:** Data
- **Required:** Yes



### motionProfile
- **Type:** Data
- **Required:** No



## Outputs


### drivenJoint
- **Type:** Data




