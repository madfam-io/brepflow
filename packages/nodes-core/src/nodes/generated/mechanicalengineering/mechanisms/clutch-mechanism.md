
# ClutchMechanism Node

**Category:** MechanicalEngineering / Mechanisms

Create clutch assembly

## Parameters


### type
- **Type:** enum
- **Default:** "friction"





### outerDiameter
- **Type:** number
- **Default:** 100
- **Min:** 30
- **Max:** 300



### innerDiameter
- **Type:** number
- **Default:** 50
- **Min:** 20
- **Max:** 150



### plateCount
- **Type:** number
- **Default:** 3
- **Min:** 1
- **Max:** 8



## Inputs


### center
- **Type:** Point
- **Required:** Yes



## Outputs


### clutch
- **Type:** Shape



### plates
- **Type:** Shape[]




