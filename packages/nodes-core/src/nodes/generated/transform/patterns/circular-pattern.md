
# CircularPattern Node

**Category:** Transform / Patterns

Creates a circular array of features or shapes

## Parameters


### count
- **Type:** number
- **Default:** 6
- **Min:** 2
- **Max:** 1000



### angle
- **Type:** number
- **Default:** 360
- **Min:** 0
- **Max:** 360
- **Description:** Total angle to fill (degrees)


### center
- **Type:** vector3
- **Default:** [0,0,0]


- **Description:** Pattern center point


### axis
- **Type:** vector3
- **Default:** [0,0,1]


- **Description:** Rotation axis


### rotateInstances
- **Type:** boolean
- **Default:** true


- **Description:** Rotate instances to follow pattern


## Inputs


### shape
- **Type:** Shape
- **Required:** Yes



## Outputs


### shapes
- **Type:** Shape[]



### compound
- **Type:** Shape




## Examples


### Bolt Circle


Parameters:
```json
{
  "count": 8,
  "angle": 360,
  "rotateInstances": false
}
```


### Turbine Blades


Parameters:
```json
{
  "count": 24,
  "angle": 360,
  "rotateInstances": true
}
```

