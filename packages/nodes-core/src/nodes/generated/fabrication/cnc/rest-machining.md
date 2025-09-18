
# RestMachining Node

**Category:** Fabrication / CNC

Rest material machining

## Parameters


### previousTool
- **Type:** number
- **Default:** 10
- **Min:** 1
- **Max:** 50



### currentTool
- **Type:** number
- **Default:** 3
- **Min:** 0.1
- **Max:** 50



## Inputs


### model
- **Type:** Shape
- **Required:** Yes



### previousPaths
- **Type:** Wire[]
- **Required:** Yes



## Outputs


### restAreas
- **Type:** Face[]



### restPaths
- **Type:** Wire[]




