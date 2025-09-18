
# Union Node

**Category:** Boolean

Combine multiple shapes into one

## Parameters


### keepOriginals
- **Type:** boolean
- **Default:** false


- **Description:** Keep original shapes


### fuzzyValue
- **Type:** number
- **Default:** 1e-7
- **Min:** 0
- **Max:** 1
- **Description:** Tolerance for fuzzy boolean


## Inputs


### shapes
- **Type:** Shape[]
- **Required:** Yes
- **Description:** Shapes to unite


## Outputs


### result
- **Type:** Shape
- **Description:** United shape



## Examples


### Simple Union


Parameters:
```json
{
  "keepOriginals": false
}
```

