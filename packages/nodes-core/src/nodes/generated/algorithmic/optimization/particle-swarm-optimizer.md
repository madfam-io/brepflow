
# ParticleSwarmOptimizer Node

**Category:** Algorithmic / Optimization

Particle swarm optimization

## Parameters


### swarmSize
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 500



### iterations
- **Type:** number
- **Default:** 100
- **Min:** 10
- **Max:** 1000



### inertia
- **Type:** number
- **Default:** 0.7
- **Min:** 0.1
- **Max:** 1



### cognitive
- **Type:** number
- **Default:** 2
- **Min:** 0.1
- **Max:** 4



### social
- **Type:** number
- **Default:** 2
- **Min:** 0.1
- **Max:** 4



## Inputs


### objective
- **Type:** Properties
- **Required:** Yes



### bounds
- **Type:** Properties
- **Required:** Yes



## Outputs


### globalBest
- **Type:** Properties



### bestValue
- **Type:** number



### swarmHistory
- **Type:** Properties[]




