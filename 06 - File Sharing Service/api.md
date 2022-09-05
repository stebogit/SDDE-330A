Files
```
POST file.add
{userId, folderId, fileName, fileContent}

DELETE file.delete
{userId, fileId}

PUT file.update
{userId, fileId, fileContent}

PATCH file.rename
{userId, fileId, newFileName}

PATCH file.move
{userId, fileId, newPath}
```

Folders
```
POST folder.add
{userId, folderId, newFolderName, newFolderContent}

POST folder.delete
{userId, folderId}

PATCH folder.rename
{userId, folderId, newName}

PATCH folder.move
{userId, folderId, newPath}
```

Resources
```
GET resource.link -> url
{userId, resourceId}

GET resource.find -> [url]
{userId, resourceName}
```
