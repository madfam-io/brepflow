
# TopologyOptimizer Node

**Category:** Algorithmic / Optimization

Topology optimization for structures

## Parameters


### densityElements
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 1000



### volumeFraction
- **Type:** number
- **Default:** 0.5
- **Min:** 0.1
- **Max:** 0.9



### penalization
- **Type:** number
- **Default:** 3
- **Min:** 1
- **Max:** 5



### filter
- **Type:** boolean
- **Default:** true





## Inputs


### designDomain
- **Type:** Shape
- **Required:** Yes



### loads
- **Type:** Properties[]
- **Required:** Yes



### supports
- **Type:** Properties[]
- **Required:** Yes



## Outputs


### optimizedShape
- **Type:** Shape



### densityField
- **Type:** Properties



### compliance
- **Type:** number




