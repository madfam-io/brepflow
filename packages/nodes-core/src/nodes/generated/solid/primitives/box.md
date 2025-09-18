
# Box Node

**Category:** Solid / Primitives

Create a parametric box/cuboid

## Parameters


### width
- **Type:** number
- **Default:** 100
- **Min:** 0.1
- **Max:** 10000
- **Description:** Width (X dimension)


### depth
- **Type:** number
- **Default:** 100
- **Min:** 0.1
- **Max:** 10000
- **Description:** Depth (Y dimension)


### height
- **Type:** number
- **Default:** 100
- **Min:** 0.1
- **Max:** 10000
- **Description:** Height (Z dimension)


### centerX
- **Type:** number
- **Default:** 0
- **Min:** -10000
- **Max:** 10000



### centerY
- **Type:** number
- **Default:** 0
- **Min:** -10000
- **Max:** 10000



### centerZ
- **Type:** number
- **Default:** 0
- **Min:** -10000
- **Max:** 10000



## Inputs

This node has no inputs.

## Outputs


### solid
- **Type:** Solid
- **Description:** Generated box



## Examples


### Unit Cube


Parameters:
```json
{
  "width": 1,
  "depth": 1,
  "height": 1
}
```


### Rectangular Block


Parameters:
```json
{
  "width": 200,
  "depth": 100,
  "height": 50
}
```

