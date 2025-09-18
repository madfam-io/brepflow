
# GenerativeDesign Node

**Category:** Specialized / Optimization

AI-driven generative design

## Parameters


### objectives
- **Type:** string[]
- **Default:** ["weight","strength"]





### generations
- **Type:** number
- **Default:** 20
- **Min:** 5
- **Max:** 100



### populationSize
- **Type:** number
- **Default:** 50
- **Min:** 10
- **Max:** 500



## Inputs


### designSpace
- **Type:** Shape
- **Required:** Yes



### requirements
- **Type:** Data
- **Required:** Yes



## Outputs


### designs
- **Type:** Shape[]



### paretoFront
- **Type:** Data




