
# LinkageMechanism Node

**Category:** MechanicalEngineering / Mechanisms

Create linkage mechanism

## Parameters


### type
- **Type:** enum
- **Default:** "four-bar"





### linkLength1
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 200



### linkLength2
- **Type:** number
- **Default:** 80
- **Min:** 10
- **Max:** 200



### linkLength3
- **Type:** number
- **Default:** 60
- **Min:** 10
- **Max:** 200



### angle
- **Type:** number
- **Default:** 0
- **Min:** 0
- **Max:** 360



## Inputs


### basePoints
- **Type:** Point[]
- **Required:** Yes



## Outputs


### mechanism
- **Type:** Shape



### links
- **Type:** Shape[]



### joints
- **Type:** Point[]




