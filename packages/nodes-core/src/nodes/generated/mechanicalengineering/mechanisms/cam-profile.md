
# CamProfile Node

**Category:** MechanicalEngineering / Mechanisms

Create cam profile

## Parameters


### baseRadius
- **Type:** number
- **Default:** 30
- **Min:** 10
- **Max:** 100



### lift
- **Type:** number
- **Default:** 10
- **Min:** 2
- **Max:** 50



### profileType
- **Type:** enum
- **Default:** "harmonic"





### dwellAngle
- **Type:** number
- **Default:** 60
- **Min:** 0
- **Max:** 180



## Inputs


### center
- **Type:** Point
- **Required:** Yes



### customProfile
- **Type:** Wire
- **Required:** No



## Outputs


### cam
- **Type:** Shape



### profile
- **Type:** Wire




