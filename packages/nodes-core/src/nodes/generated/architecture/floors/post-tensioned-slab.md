
# PostTensionedSlab Node

**Category:** Architecture / Floors

Post-tensioned concrete slab

## Parameters


### slabThickness
- **Type:** number
- **Default:** 200
- **Min:** 150
- **Max:** 400



### tendonSpacing
- **Type:** number
- **Default:** 1200
- **Min:** 900
- **Max:** 1800



## Inputs


### slabOutline
- **Type:** Wire
- **Required:** Yes



### columnPoints
- **Type:** Point[]
- **Required:** No



## Outputs


### ptSlab
- **Type:** Shape



### tendons
- **Type:** Wire[]




