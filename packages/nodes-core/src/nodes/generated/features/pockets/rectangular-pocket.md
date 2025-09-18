
# RectangularPocket Node

**Category:** Features / Pockets

Creates a rectangular pocket with optional corner radius

## Parameters


### width
- **Type:** number
- **Default:** 50
- **Min:** 0.1
- **Max:** 10000



### height
- **Type:** number
- **Default:** 30
- **Min:** 0.1
- **Max:** 10000



### depth
- **Type:** number
- **Default:** 10
- **Min:** 0.1
- **Max:** 1000



### cornerRadius
- **Type:** number
- **Default:** 0
- **Min:** 0
- **Max:** 100
- **Description:** Corner radius (0 for sharp corners)


### draftAngle
- **Type:** number
- **Default:** 0
- **Min:** 0
- **Max:** 45
- **Description:** Draft angle for molding


## Inputs


### face
- **Type:** Face
- **Required:** Yes
- **Description:** Face to create pocket on


### position
- **Type:** Point
- **Required:** Yes
- **Description:** Pocket center position


## Outputs


### shape
- **Type:** Shape




