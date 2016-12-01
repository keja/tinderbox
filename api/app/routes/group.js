var Promise = require('promise');
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

    //list group members by group id
    router.route('/groups/:id').get(function (req, res) {
        models.group.findOne({_id: req.params.id}, function (err, group) {
            if (err) {
                res.send(err);
            }
            var users = function(g){
                return new Promise(function(resolve,reject) {
                    models.user.find({ '_id': { $in: g.members }}, function (err, users){
                        if(err){
                            reject(err)
                        }
                        //group.members = users;
                        resolve(users);
                    });
                });
            };
            var artists = function(g){
                return new Promise(function(resolve,reject) {
                    models.artist.find({ '_id': { $in: g.artists }}, function (err, artists){
                        if(err){
                            reject(err)
                        }
                        //group.members = users;
                        resolve(artists);
                    });
                });
            };

            artists(group).then(function(artists){
               users(group).then(function(users){
                   group.members = users;
                   group.artists = artists;

                   res.json(group);
               });
            });

        });
    });

    //create new group
    //post args: [name: (string)]
    router.route('/groups/create').post(function (req, res) {

        models.group.create({ name: req.body.name }, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });

    });

    //add member to group
    //post args: [group_id: (int), member_id: (int)]
    router.route('/groups/join').post(function (req, res) {

        //in the perfect world we should validate that the user_id exist and and also that the group_id exists and user not already in the group

        var query = {_id: req.body.group_id},
            doc = {$push: {"members": req.body.member_id}};

        models.group.update(query, doc, function (err, model) {
            if (err) {
                res.send({success: false, error: err});
            }
            res.json({success: true});
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
                res.send({success: false, error: err});
            }
            res.json({success: true});
        });
    });

    router.route('/groups/pin-artist').post(function(req, res){
        var query = {_id: req.body.group_id},
            doc = {$push: {"artists": req.body.artist_id}};

        models.group.update(query, doc, function (err, model) {
            if (err) {
                res.send({success: false, error: err});
            }
            res.json({success: true, object: model});
        });
    });

    //remove all collections (to remove test data)
    router.route("/groups/clear").post(function(req, res){
        models.group.remove({}, function(err) {
            console.log('collection removed')
            res.json({ success: err ? false : true });
        });
    });
};