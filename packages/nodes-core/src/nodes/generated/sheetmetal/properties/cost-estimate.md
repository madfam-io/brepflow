
# CostEstimate Node

**Category:** SheetMetal / Properties

Estimate manufacturing cost

## Parameters


### materialCostPerKg
- **Type:** number
- **Default:** 2
- **Min:** 0.1
- **Max:** 1000



### setupCost
- **Type:** number
- **Default:** 50
- **Min:** 0
- **Max:** 10000



### bendCost
- **Type:** number
- **Default:** 0.5
- **Min:** 0
- **Max:** 100
- **Description:** Cost per bend


### cutCostPerMeter
- **Type:** number
- **Default:** 1
- **Min:** 0
- **Max:** 100



## Inputs


### sheet
- **Type:** Shape
- **Required:** Yes



### quantity
- **Type:** number
- **Required:** No



## Outputs


### cost
- **Type:** number



### breakdown
- **Type:** Data




