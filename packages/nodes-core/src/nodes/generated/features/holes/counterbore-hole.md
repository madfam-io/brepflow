
# CounterboreHole Node

**Category:** Features / Holes

Creates a counterbore hole for socket head cap screws

## Parameters


### holeDiameter
- **Type:** number
- **Default:** 6.5
- **Min:** 0.1
- **Max:** 100
- **Description:** Through hole diameter


### counterbore
- **Type:** number
- **Default:** 11
- **Min:** 0.1
- **Max:** 200
- **Description:** Counterbore diameter


### cbDepth
- **Type:** number
- **Default:** 6
- **Min:** 0.1
- **Max:** 100
- **Description:** Counterbore depth


### holeDepth
- **Type:** number
- **Default:** -1
- **Min:** -1

- **Description:** Total hole depth (-1 for through)


## Inputs


### solid
- **Type:** Shape
- **Required:** Yes



### position
- **Type:** Point
- **Required:** Yes



## Outputs


### shape
- **Type:** Shape




## Examples


### M6 SHCS


Parameters:
```json
{
  "holeDiameter": 6.5,
  "counterbore": 11,
  "cbDepth": 6
}
```


### M10 SHCS


Parameters:
```json
{
  "holeDiameter": 11,
  "counterbore": 18,
  "cbDepth": 10
}
```

