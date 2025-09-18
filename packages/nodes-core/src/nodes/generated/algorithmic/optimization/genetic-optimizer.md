
# GeneticOptimizer Node

**Category:** Algorithmic / Optimization

Genetic algorithm optimization

## Parameters


### populationSize
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 1000



### generations
- **Type:** number
- **Default:** 50
- **Min:** 5
- **Max:** 500



### mutationRate
- **Type:** number
- **Default:** 0.1
- **Min:** 0.01
- **Max:** 0.5



### crossoverRate
- **Type:** number
- **Default:** 0.8
- **Min:** 0.1
- **Max:** 1



### elitism
- **Type:** number
- **Default:** 0.1
- **Min:** 0
- **Max:** 0.5



## Inputs


### objectives
- **Type:** Properties
- **Required:** Yes



### constraints
- **Type:** Properties
- **Required:** No



### bounds
- **Type:** Properties
- **Required:** Yes



## Outputs


### bestSolution
- **Type:** Properties



### fitness
- **Type:** number



### generations
- **Type:** Properties[]



### convergence
- **Type:** number[]




