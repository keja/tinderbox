module.exports = function(router, models) {
    //list all groups
    router.route('/groups').get(function (req, res) {
        models.group.find(function (err, groups) {
            if (err) {
                res.send(err);
            }
            res.json(groups);
        });
    });

    //create new group
    //post args: [name: (string)]
    router.route('/groups/create').post(function (req, res) {
        var group = new models.group();
        group.name = req.body.name;

        group.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Group created!'});
        });
    });

    //add member to group
    //post args: [group_id: (int), member_id: (int)]
    router.route('/groups/join').post(function (req, res) {

        var query = {_id: req.body.group_id},
            doc = {$push: {"members": req.body.member_id}};

        models.group.update(query, doc, function (err, model) {
            if (err) {
                res.send(err);
            }
            res.json(model);
        });
        /*
         Group.findByIdAndUpdate(req.body.group_id,
         {$push: {"messages": req.body.member_id }},
         {safe: true, upsert: true},
         function(err, model) {
         if(err){
         res.send(err);
         }
         res.json(model);
         }
         );
         */
    });

    //remove member from group
    //post args: [group_id: (int), member_id: (int)]
    router.route('/groups/leave').post(function (req, res) {

        //https://docs.mongodb.com/manual/reference/operator/update/pullAll/
        var query = {_id: req.body.group_id},
            doc = {$pullAll: {members: [req.body.member_id]}};

        models.group.update(query, doc, function (err, model) {
            if (err) {
                res.send(err);
            }
            res.json(model);
        });
    });
};