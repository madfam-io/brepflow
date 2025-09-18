
# ExtensionSpring Node

**Category:** MechanicalEngineering / Springs

Create extension spring with hooks

## Parameters


### wireDiameter
- **Type:** number
- **Default:** 1.5
- **Min:** 0.5
- **Max:** 8



### coilDiameter
- **Type:** number
- **Default:** 15
- **Min:** 5
- **Max:** 80



### bodyLength
- **Type:** number
- **Default:** 40
- **Min:** 10
- **Max:** 150



### coils
- **Type:** number
- **Default:** 10
- **Min:** 5
- **Max:** 40



### hookType
- **Type:** enum
- **Default:** "machine"





## Inputs


### center
- **Type:** Point
- **Required:** Yes



## Outputs


### spring
- **Type:** Shape



### hooks
- **Type:** Wire[]




