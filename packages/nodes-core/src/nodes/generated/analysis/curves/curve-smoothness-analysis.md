
# CurveSmoothnessAnalysis Node

**Category:** Analysis / Curves

Analyze curve continuity and smoothness

## Parameters


### continuityLevel
- **Type:** enum
- **Default:** "G2"





### tolerance
- **Type:** number
- **Default:** 0.01
- **Min:** 0.001
- **Max:** 1



### showBreaks
- **Type:** boolean
- **Default:** true





## Inputs


### curve
- **Type:** Wire
- **Required:** Yes



## Outputs


### isSmooth
- **Type:** boolean



### breakPoints
- **Type:** Point[]



### continuityReport
- **Type:** Properties




