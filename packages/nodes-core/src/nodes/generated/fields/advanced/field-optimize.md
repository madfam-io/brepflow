
# FieldOptimize Node

**Category:** Fields / Advanced

Optimize field for objective

## Parameters


### iterations
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 1000
- **Description:** Optimization iterations


### objective
- **Type:** enum
- **Default:** "\"minimize\""


- **Description:** Optimization objective


### learningRate
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1
- **Description:** Learning rate


## Inputs


### initialField
- **Type:** Field
- **Required:** No



### constraints
- **Type:** Field
- **Required:** No



## Outputs


### optimizedField
- **Type:** Field



### convergence
- **Type:** NumberList




