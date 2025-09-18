
# CompressionSpring Node

**Category:** MechanicalEngineering / Springs

Create compression coil spring

## Parameters


### wireDiameter
- **Type:** number
- **Default:** 2
- **Min:** 0.5
- **Max:** 10



### coilDiameter
- **Type:** number
- **Default:** 20
- **Min:** 5
- **Max:** 100



### freeLength
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 200



### coils
- **Type:** number
- **Default:** 8
- **Min:** 3
- **Max:** 30



### endType
- **Type:** enum
- **Default:** "closed"





## Inputs


### center
- **Type:** Point
- **Required:** Yes



### axis
- **Type:** Vector
- **Required:** No



## Outputs


### spring
- **Type:** Shape



### helix
- **Type:** Wire




