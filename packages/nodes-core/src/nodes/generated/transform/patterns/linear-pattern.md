
# LinearPattern Node

**Category:** Transform / Patterns

Creates a linear array of features or shapes

## Parameters


### count
- **Type:** number
- **Default:** 5
- **Min:** 2
- **Max:** 1000
- **Description:** Number of instances


### spacing
- **Type:** number
- **Default:** 20
- **Min:** 0.1
- **Max:** 10000
- **Description:** Distance between instances


### direction
- **Type:** vector3
- **Default:** [1,0,0]


- **Description:** Pattern direction vector


### centered
- **Type:** boolean
- **Default:** false


- **Description:** Center pattern around origin


## Inputs


### shape
- **Type:** Shape
- **Required:** Yes
- **Description:** Shape or feature to pattern


## Outputs


### shapes
- **Type:** Shape[]
- **Description:** Array of patterned shapes


### compound
- **Type:** Shape
- **Description:** Compound shape of all instances



## Examples


### Hole Pattern


Parameters:
```json
{
  "count": 10,
  "spacing": 15,
  "direction": [
    1,
    0,
    0
  ]
}
```


### Centered Array


Parameters:
```json
{
  "count": 7,
  "spacing": 25,
  "centered": true
}
```

