
# ClearanceCheck Node

**Category:** Analysis / Proximity

Check clearance requirements

## Parameters


### requiredClearance
- **Type:** number
- **Default:** 5
- **Min:** 0.1
- **Max:** 100



### highlightViolations
- **Type:** boolean
- **Default:** true





## Inputs


### movingObject
- **Type:** Shape
- **Required:** Yes



### obstacles
- **Type:** Shape[]
- **Required:** Yes



## Outputs


### hasViolations
- **Type:** boolean



### violationPoints
- **Type:** Point[]



### clearanceValues
- **Type:** number[]




