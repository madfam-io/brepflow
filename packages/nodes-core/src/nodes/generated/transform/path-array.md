
# PathArray Node

**Category:** Transform

Array shapes along a path

## Parameters


### count
- **Type:** number
- **Default:** 10
- **Min:** 2
- **Max:** 1000



### alignToPath
- **Type:** boolean
- **Default:** true





### spacing
- **Type:** enum
- **Default:** "equal"





### distance
- **Type:** number
- **Default:** 50
- **Min:** 0.1
- **Max:** 10000



### merge
- **Type:** boolean
- **Default:** false





## Inputs


### shape
- **Type:** Shape
- **Required:** Yes



### path
- **Type:** Wire
- **Required:** Yes
- **Description:** Path curve


## Outputs


### array
- **Type:** Shape[]



### merged
- **Type:** Shape




