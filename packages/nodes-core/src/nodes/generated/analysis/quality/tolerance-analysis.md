
# ToleranceAnalysis Node

**Category:** Analysis / Quality

Analyze geometric tolerances

## Parameters


### nominalTolerance
- **Type:** number
- **Default:** 0.1
- **Min:** 0.001
- **Max:** 10



### showDeviations
- **Type:** boolean
- **Default:** true





## Inputs


### measured
- **Type:** Shape
- **Required:** Yes



### nominal
- **Type:** Shape
- **Required:** Yes



## Outputs


### withinTolerance
- **Type:** boolean



### maxDeviation
- **Type:** number



### deviationMap
- **Type:** Shape




