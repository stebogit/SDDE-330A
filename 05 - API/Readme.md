# Homework #5: API Design

**API Design**: Describe the APIs that will be required for the "File System", "Chat Server" and the "Personal Financial
Manager" systems designed in the previous 3 weeks. Please call out if these will be REST/RPC APIs.

## File System

For the type of service it provides an RPC API, behaviour oriented, would be more proper here:

```
POST file.create
  { path, fileName, content }
GET file.delete?filePath=
GET file.rename?filePath=&newName=
GET file.moveTo?fromPath=&toPath=
GET file.copy?filePath=
GET file.read?filePath=
POST file.write
  { filePath, content }

GET dir.create?path=&dirName=
GET dir.delete?dirPath=&recursive=
GET dir.rename?dirPath=&newName=
GET dir.moveTo?fromPath=&toPath=
GET dir.copy?dirPath=
GET dir.listContent?dirPath=
GET dir.addElement?dirPath=&elementPath=
GET dir.removeElement?dirPath=&recursive=
```

## Chat Server

An RPC API would probably be appropriate here as well:

```
GET chat.listRooms
GET chat.createRoom?roomName=
GET chat.enterRoom?roomId=
GET chat.leaveRoom?roomId=
GET chat.deleteRoom?roomId=

GET chatRoom.getUsers
POST chatRoom.sendMessage
  { text, recipients }
POST chatRoom.editMessage
  { messageId, text, recipients }
GET chatRoom.deleteMessage?messageId=
```

## Personal Financial Manager

I would probably choose a REST API in this case, as the main focus is the financial data:

```
GET|POST|PATCH|DELETE banks/{bank_id?}
GET|POST|PATCH|DELETE banks/{bank_id}/accounts/{account_id?}
GET|POST|PATCH|DELETE banks/{bank_id}/accounts/{account_id}/transactions/{transaction_id?}
GET|POST|PATCH|DELETE banks/{bank_id}/loans/{loan_id?}
GET|POST|PATCH|DELETE banks/{bank_id}/payees/{payee_id?}

GET|POST|PATCH|DELETE credit_card/{cc_id?}
GET|POST|PATCH|DELETE credit_card/{cc_id}/providers/{cc_provider_id?}
GET|POST|PATCH|DELETE credit_card/{cc_id}/transactions/{cc_transaction_id?}

GET|POST|PATCH|DELETE portfolio/{portfolio_id?}
GET|POST|PATCH|DELETE portfolio/{portfolio_id}/items/{item_id?}

GET|POST|PATCH|DELETE subscriptions/{subscription_id?}
```
