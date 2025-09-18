
# S3Upload Node

**Category:** Interoperability / Cloud

Upload files to AWS S3

## Parameters


### bucket
- **Type:** string
- **Default:** ""


- **Description:** S3 bucket name


### accessKey
- **Type:** string
- **Default:** ""


- **Description:** AWS access key


### secretKey
- **Type:** string
- **Default:** ""


- **Description:** AWS secret key


### region
- **Type:** string
- **Default:** "us-east-1"





## Inputs


### filePath
- **Type:** string
- **Required:** Yes



### key
- **Type:** string
- **Required:** Yes



## Outputs


### success
- **Type:** boolean



### url
- **Type:** string



### etag
- **Type:** string




