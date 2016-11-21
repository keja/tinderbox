#Backend REST API

##Groups



| Path            | Description              | Method  |  Args                | Return                                |
|-----------------|--------------------------|:-------:|----------------------|---------------------------------------|
| /groups         | List all groups          | GET     | N/A                  | [{_id, name, members, artists}, ...]  |
| /groups/create  | Create new group         | POST    | name                 | {_id, name, members, artists}         |
| /groups/join    | Join existing group      | POST    | group_id, member_id  | BOOL                                  |
| /groups/leave   | Remove member from group | POST    | group_id, member_id  | BOOL                                  |