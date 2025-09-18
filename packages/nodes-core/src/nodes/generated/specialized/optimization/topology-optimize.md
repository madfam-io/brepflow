
# TopologyOptimize Node

**Category:** Specialized / Optimization

Topology optimization

## Parameters


### volumeFraction
- **Type:** number
- **Default:** 0.3
- **Min:** 0.1
- **Max:** 0.9



### penaltyFactor
- **Type:** number
- **Default:** 3
- **Min:** 1
- **Max:** 5



### filterRadius
- **Type:** number
- **Default:** 2
- **Min:** 0.5
- **Max:** 10



### iterations
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 500



## Inputs


### designSpace
- **Type:** Shape
- **Required:** Yes



### loads
- **Type:** Data
- **Required:** Yes



### constraints
- **Type:** Data
- **Required:** Yes



## Outputs


### optimized
- **Type:** Shape



### convergence
- **Type:** Data




