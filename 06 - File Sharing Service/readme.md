# Homework #6: End to End System Design for File Sharing Service (like DropBox)


### End to End System Design:

Please provide an end to end system design for a File Sharing Service (like Dropbox). Please call out the functional and
non-functional requirements (you will need to research what scale Dropbox operates at today), Data model, storage, type
of storage, APIs and key issues in the design. Please provide a picture of how the different components/services of the
design will be laid out and how they will communicate.

Ensure that this design document is no more than 4 pages long.

### Key Requirements:

**Functional/Use Cases:**

* Add File
  * User Id
  * Folder Id
  * File Blob (Compressed)
* Remove File
  * User Id
  * File Id
* Update File
  * User Id
  * File Id
  * Folder Id
  * File Blob

Bulk operations like syncing Folders?

* Add Folder
  * UserId
  * Folder Blob (Compressed)
* Remove Folder
  * User Id
  * FolderId
* Update Folder
  * Find/Remove/Add
  * FolderId
* Web View
* Mobile View

* Search

**Non-Functional:**

* Scalability: 10 M Users
  * 10 GB
  * 10 M Files
  * Add: 100K TPS
  * Remove: 10K TPS
  * Update File: 1 M TPS
* Availability: 99.999%
* Performance/Latency
  * 100 MB/s
