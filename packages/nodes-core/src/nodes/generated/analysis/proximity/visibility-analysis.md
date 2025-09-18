
# VisibilityAnalysis Node

**Category:** Analysis / Proximity

Analyze line-of-sight visibility

## Parameters


### viewAngle
- **Type:** number
- **Default:** 120
- **Min:** 10
- **Max:** 360



### maxDistance
- **Type:** number
- **Default:** 100
- **Min:** 1
- **Max:** 1000



## Inputs


### viewpoint
- **Type:** Point
- **Required:** Yes



### targets
- **Type:** Point[]
- **Required:** Yes



### obstacles
- **Type:** Shape[]
- **Required:** No



## Outputs


### visibleTargets
- **Type:** Point[]



### occludedTargets
- **Type:** Point[]



### sightLines
- **Type:** Wire[]




