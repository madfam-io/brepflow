
# RobotKinematics Node

**Category:** Fabrication / Robotics

Robot kinematics solver

## Parameters


### robotType
- **Type:** enum
- **Default:** "6-axis"





### solver
- **Type:** enum
- **Default:** "inverse"





## Inputs


### target
- **Type:** Transform
- **Required:** Yes



### jointLimits
- **Type:** Data
- **Required:** No



## Outputs


### jointAngles
- **Type:** Number[]



### reachable
- **Type:** Boolean




