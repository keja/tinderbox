#this is the backend rest api

##Groups

| Path            | Description              | Method  |  Args                | Return |
|-----------------|--------------------------|:-------:|----------------------|--------|
| /groups         | List all groups          | GET     | None                 | JSON   |
| /groups/create  | create new group         | POST    | name                 | JSON   |
| /groups/join    | Join existing group      | POST    | group_id, member_id  | JSON   |
| /groups/leave   | Remove member from group | POST    | group_id, member_id  | JSON   |