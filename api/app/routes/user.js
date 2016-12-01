module.exports = function(router, models) {

    //list all users
    router.route('/user').get(function (req, res) {
        models.user.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

    router.route("/user/remove/:id").post(function(req, res){
        models.user.remove({ _id: req.params.id }, function(err) {
            if (err) {
                res.send(err);
            }
            else {
               res.json({"success": true});
            }
        });
    });


    //create new user
    router.route('/user/create').post(function (req, res) {
        var user = new models.user();
        user.name    = req.body.name;
        user.fb_id   = req.body.fb_id;
        user.image   = req.body.image;

        user.save(function (err, model) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'User created!', object: model});
        });
    });

    //get user location
    router.route("/user/locate/:id").get(function(req, res){
        models.user.findOne({_id: req.params.id }, function (err, user) {
            if (err) {
                res.send(err);
            }

            res.json(user.location);


        });
    });

    //set user location
    router.route("/user/locate/:id").post(function(req, res){
        var query = {_id: req.params.id},
            doc = {"location": {latitude: req.body.lat, longitude: req.body.lng}};

        models.user.update(query, doc, function (err, model) {
            if (err) {
                res.send({success: false, error: err});
            }
            res.json({success: true});
        });
    });



    //pin artist
    router.route('/user/pin-artist').post(function(req, res){
        var query = {_id: req.body.user_id},
            doc = {$push: {"artists": req.body.artist_id}};

        models.user.update(query, doc, function (err, model) {
            if (err) {
                res.send({success: false, error: err});
            }
            res.json({success: true, object: model});
        });
    });
    //pin artist
    router.route('/user/unpin-artist').post(function(req, res){

        var query = {_id: req.body.user_id},
            doc = {$pullAll: {artists: [req.body.artist_id]}};

        models.user.update(query, doc, function (err, model) {
            if (err) {
                res.send({success: false, error: err});
            }
            res.json({success: true, object: model});
        });

    });

    router.route("/user/personal-page/:id").get(function(req, res){
        models.user.findOne({_id: req.params.id }, function (err, user) {
            if (err) {
                res.send(err);
            }

            if(user.artists && user.artists.length){
                models.artist.find({ '_id': { $in: user.artists }}, function (err, artists){
                    user.artists = artists;
                    res.json(user);
                });
            }else{
                res.json(user);
            }


        });
    });

};