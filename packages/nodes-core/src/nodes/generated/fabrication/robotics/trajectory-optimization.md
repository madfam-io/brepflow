
# TrajectoryOptimization Node

**Category:** Fabrication / Robotics

Optimize robot trajectory

## Parameters


### objective
- **Type:** enum
- **Default:** "time"





### maxVelocity
- **Type:** number
- **Default:** 1000
- **Min:** 10
- **Max:** 5000



### maxAcceleration
- **Type:** number
- **Default:** 5000
- **Min:** 100
- **Max:** 20000



## Inputs


### trajectory
- **Type:** Transform[]
- **Required:** Yes



## Outputs


### optimizedTrajectory
- **Type:** Transform[]



### velocityProfile
- **Type:** Data




