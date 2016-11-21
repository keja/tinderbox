#this is the backend rest api

##Groups

| Path            | Method  |  Args                | Return |
|-----------------|:-------:|---------------------:|--------|
| /groups         | GET     | None                 | JSON   |
| /groups/create  | POST    | name                 | JSON   |
| /groups/join    | POST    | group_id, member_id  | JSON   |
| /groups/leave   | POST    | group_id, member_id  | JSON   |