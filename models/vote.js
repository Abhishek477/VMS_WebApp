var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var VoteSchema = new Schema({
    os1 : {
        type : String ,
        required : true
    },
    os2 : {
        type : String ,
        required : true
    },
    os3 : {
        type : String ,
        required : true
    },
    os4 : {
        type : String ,
        required : true
    },

    points1 : {
        type : String,
        required : true
    },
    points2 : {
        type : String,
        required : true
    },
    points3 : {
        type : String,
        required : true
    },
    points4 : {
        type : String,
        required : true
    },
});

//Create Collection and Add Schema

var Vote = mongoose.model('Vote',VoteSchema);

module.exports = Vote ;