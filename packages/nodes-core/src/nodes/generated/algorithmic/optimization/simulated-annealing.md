
# SimulatedAnnealing Node

**Category:** Algorithmic / Optimization

Simulated annealing optimization

## Parameters


### initialTemp
- **Type:** number
- **Default:** 1000
- **Min:** 1
- **Max:** 10000



### finalTemp
- **Type:** number
- **Default:** 0.1
- **Min:** 0.001
- **Max:** 10



### coolingRate
- **Type:** number
- **Default:** 0.95
- **Min:** 0.8
- **Max:** 0.99



### maxIterations
- **Type:** number
- **Default:** 1000
- **Min:** 100
- **Max:** 10000



## Inputs


### objective
- **Type:** Properties
- **Required:** Yes



### initialSolution
- **Type:** Properties
- **Required:** Yes



## Outputs


### bestSolution
- **Type:** Properties



### bestValue
- **Type:** number



### temperature
- **Type:** number[]



### values
- **Type:** number[]




