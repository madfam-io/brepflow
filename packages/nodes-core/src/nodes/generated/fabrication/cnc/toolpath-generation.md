
# ToolpathGeneration Node

**Category:** Fabrication / CNC

Generate CNC toolpaths

## Parameters


### strategy
- **Type:** enum
- **Default:** "parallel"





### toolDiameter
- **Type:** number
- **Default:** 6
- **Min:** 0.1
- **Max:** 50



### stepover
- **Type:** number
- **Default:** 0.5
- **Min:** 0.1
- **Max:** 1



## Inputs


### model
- **Type:** Shape
- **Required:** Yes



### stock
- **Type:** Shape
- **Required:** No



## Outputs


### toolpath
- **Type:** Wire[]



### rapids
- **Type:** Wire[]




