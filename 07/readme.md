# Homework #7: End to End System Design for Social Messaging Service


**End to End System Design for Social Messaging Service:** Please provide an end to end system design for a Social Messaging
Service (like WhatsApp). Please call out the functional and non-functional requirements (you will need to research what
scale WhatsApp operates at today), Data model, storage, type of storage, APIs and key issues in the design. Please
provide a picture of how the different components/services of the design will be laid out and how they will communicate.
Also include details on how your system will be able to handle celebrity users.

Ensure that this design document is no more than 4 pages long.

Functional/Use Cases

1. Find Contacts
2. Start Communication
3. End Communication
4. Continue Communication
   1. Text
   2. Audio
   3. Video
5. Start Group Communication
   1. Text
   2. Audio
   3. Video
6. End Group Communication (Delete Group)
7. Participate in Group Communication
8. Typing Notifications
9. Read Notification

Non-Functional

1. Scale
    - 10 Users each
    - 27x27x27 = 25000 B Channels
    - 3B Users
    - 1000 1:1 Comm. Channels Open/User = 3BC2 = 5B Channels
    - 100 Group Comm. Channels
    - Open/User
2. Availability
    - 99.999%
3. Reliability
    - Text - High
    - Audio/Video - May be missed
