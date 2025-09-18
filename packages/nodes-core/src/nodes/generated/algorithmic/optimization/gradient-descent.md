
# GradientDescent Node

**Category:** Algorithmic / Optimization

Gradient descent optimization

## Parameters


### learningRate
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1



### maxIterations
- **Type:** number
- **Default:** 1000
- **Min:** 10
- **Max:** 10000



### tolerance
- **Type:** number
- **Default:** 0.001
- **Min:** 0.000001
- **Max:** 0.1



### momentum
- **Type:** number
- **Default:** 0.9
- **Min:** 0
- **Max:** 1



## Inputs


### objective
- **Type:** Properties
- **Required:** Yes



### initialPoint
- **Type:** Point
- **Required:** Yes



## Outputs


### optimumPoint
- **Type:** Point



### optimumValue
- **Type:** number



### trajectory
- **Type:** Point[]



### convergence
- **Type:** number[]




