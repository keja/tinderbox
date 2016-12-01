module.exports = function(router, models) {
    //list all artists
    router.route('/artists').get(function (req, res) {
        models.artist.find(function (err, groups) {
            if (err) {
                res.send(err);
            }
            res.json(groups);
        });
    });

    //list artist by id
    router.route('/artists/:id').get(function (req, res) {
        models.artist.findOne({_id: req.params.id }, function (err, artist) {
            if (err) {
                res.send(err);
            }
            res.json(artist);
        });
    });

    //create new artist
    //post args: [name: (string), stage: (string), time_start: (datetime), time_end: (datetime), image: (string), description: (string)]
    router.route('/artist/create').post(function (req, res) {
        var artist = new models.artist();
        artist.name         = req.body.name;
        artist.stage        = req.body.stage;
        artist.time_start   = req.body.time_start;
        artist.time_end     = req.body.time_end;
        artist.image        = req.body.image;
        artist.description  = req.body.description;

        artist.save(function (err, model) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Artist created!', object: model});
        });
    });


    //remove all collections (to remove test data)
    router.route("/artist/clear").post(function(req, res){
        models.artist.remove({}, function(err) {
            console.log('collection removed')
            res.json({ success: err ? false : true });
        });
    });


};