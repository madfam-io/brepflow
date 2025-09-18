
# LinearArray Node

**Category:** Transform

Create linear array of shapes

## Parameters


### count
- **Type:** number
- **Default:** 5
- **Min:** 2
- **Max:** 1000



### spacingX
- **Type:** number
- **Default:** 100
- **Min:** -10000
- **Max:** 10000



### spacingY
- **Type:** number
- **Default:** 0
- **Min:** -10000
- **Max:** 10000



### spacingZ
- **Type:** number
- **Default:** 0
- **Min:** -10000
- **Max:** 10000



### merge
- **Type:** boolean
- **Default:** false


- **Description:** Merge into single shape


## Inputs


### shape
- **Type:** Shape
- **Required:** Yes



## Outputs


### array
- **Type:** Shape[]
- **Description:** Array of shapes


### merged
- **Type:** Shape
- **Description:** Merged result (if merge=true)



