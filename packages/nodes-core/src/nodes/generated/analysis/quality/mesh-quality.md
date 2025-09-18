
# MeshQuality Node

**Category:** Analysis / Quality

Analyze mesh quality metrics

## Parameters


### aspectRatioThreshold
- **Type:** number
- **Default:** 5
- **Min:** 1
- **Max:** 20



### skewnessThreshold
- **Type:** number
- **Default:** 0.8
- **Min:** 0.1
- **Max:** 1



## Inputs


### mesh
- **Type:** Shape
- **Required:** Yes



## Outputs


### averageAspectRatio
- **Type:** number



### maxSkewness
- **Type:** number



### problemElements
- **Type:** Shape[]



### qualityReport
- **Type:** Properties




