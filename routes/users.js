var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var mongoose = require('mongoose');
var Vote = require('../models/vote')

var pusher = new Pusher({
    appId: '544848',
    key: '4e94b627fd5fa993dcef',
    secret: 'dbd8629176c3f0a14487',
    cluster: 'ap2',
    encrypted: true
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  Vote.find().then( function (votes) {

      res.json( {
          success : true , votes : votes
      });
  })
});

router.post('/' , function(req,res){
    var newVote = {
        points1 : req.body.os1,
        points2 : req.body.os2,
        points3 : req.body.os3,
        points4 : req.body.os4,
        os1 : req.body.nm1,
        os2 : req.body.nm2,
        os3 : req.body.nm3,
        os4 : req.body.nm4
    }

    new Vote(newVote).save().then(vote =>{
        pusher.trigger('os-poll', 'os-vote', {
        //points:1,
        points1 : vote.points1,
        points2 : vote.points2,
        points3 : vote.points3,
        points4 : vote.points4,
        os1 : vote.os1,
        os2 : vote.os2,
        os3 : vote.os3,
        os4 : vote.os4

    });
    return res.json({success:true , message:'Thank you for voting'});
    });
});
    /*pusher.trigger('os-poll', 'os-vote', {
        //points:1,
        points1 : req.body.os1,
        points2 : req.body.os2,
        points3 : req.body.os3,
        points4 : req.body.os4,
        os1 : req.body.nm1,
        os2 : req.body.nm2,
        os3 : req.body.nm3,
        os4 : req.body.nm4

    });
    return res.json({success:true , message:'Thank you for voting'});
});
*/
module.exports = router;

