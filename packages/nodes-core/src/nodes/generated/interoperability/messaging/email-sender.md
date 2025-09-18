
# EmailSender Node

**Category:** Interoperability / Messaging

Send email notifications

## Parameters


### smtpServer
- **Type:** string
- **Default:** ""


- **Description:** SMTP server address


### port
- **Type:** number
- **Default:** 587
- **Min:** 1
- **Max:** 65535



### username
- **Type:** string
- **Default:** ""





### password
- **Type:** string
- **Default:** ""





## Inputs


### to
- **Type:** string
- **Required:** Yes



### subject
- **Type:** string
- **Required:** Yes



### body
- **Type:** string
- **Required:** Yes



### attachments
- **Type:** string[]
- **Required:** No



## Outputs


### sent
- **Type:** boolean



### messageId
- **Type:** string




