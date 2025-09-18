
# LinearRib Node

**Category:** Features / Structural

Creates a reinforcing rib along a path

## Parameters


### thickness
- **Type:** number
- **Default:** 3
- **Min:** 0.1
- **Max:** 100



### height
- **Type:** number
- **Default:** 20
- **Min:** 0.1
- **Max:** 1000



### draftAngle
- **Type:** number
- **Default:** 1
- **Min:** 0
- **Max:** 10
- **Description:** Draft angle for molding


### topRadius
- **Type:** number
- **Default:** 1
- **Min:** 0
- **Max:** 50
- **Description:** Top edge fillet radius


## Inputs


### face
- **Type:** Face
- **Required:** Yes
- **Description:** Base face for rib


### path
- **Type:** Curve
- **Required:** Yes
- **Description:** Path for rib


## Outputs


### shape
- **Type:** Shape




