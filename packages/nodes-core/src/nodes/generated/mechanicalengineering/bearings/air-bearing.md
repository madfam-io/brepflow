
# AirBearing Node

**Category:** MechanicalEngineering / Bearings

Create air bearing design

## Parameters


### diameter
- **Type:** number
- **Default:** 50
- **Min:** 20
- **Max:** 200



### thickness
- **Type:** number
- **Default:** 10
- **Min:** 5
- **Max:** 30



### pocketCount
- **Type:** number
- **Default:** 6
- **Min:** 3
- **Max:** 12



### restrictorType
- **Type:** enum
- **Default:** "orifice"





## Inputs


### center
- **Type:** Point
- **Required:** Yes



## Outputs


### bearing
- **Type:** Shape



### pockets
- **Type:** Face[]



### restrictors
- **Type:** Wire[]




