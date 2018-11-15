'use strict';
const nodemailer = require('nodemailer');
var admin = require("firebase-admin");
var serviceAccount = require("./v-m-s-52555-firebase-adminsdk-m7vhc-54c2526726.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://v-m-s-52555.firebaseio.com"
});
/*
var refDB = db.ref("Registration/" + userId1);
refDB.on("value", function(snapshot) {
    var chartData = snapshot.val();
    refDB = db.ref("Registration/" + userId1 + "/Tickets/" + chartData.TktNo);
    refDB.on("value", function(snapshot) {
        var ticketDetails = snapshot.val();
    });
});

var refDB = db.ref("Registration");
refDB.on("value", function(snapshot) {
    chartData = snapshot.val();
    var keys1 = Object.keys(chartData);
    for(var i = 0; i < keys1.length; i++){
        refDB = db.ref("Registration/" + keys1[i]);
        refDB.on("value", function(snapshot) {
            chartData = snapshot.val();
            if(chartData.VRNo == ticketDetails.VRNo){
                window.alert("Found!");
                var toMail = keys1[i];
            }
        });
    }
});
*/


function sendMail(){

    var db = admin.database();
    var mailDetails;

    const sendMail = nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY
            }
        });

        let mailOptions;
        var ref = db.ref("Registration/mailService");
        ref.on("value", function(snapshot) {
            mailDetails = snapshot.val();
            console.log(mailDetails.from);
            mailOptions = {
                from: mailDetails.from,
                to: mailDetails.to,
                subject: mailDetails.subject,
                html: mailDetails.html
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        });
    });
}


module.exports = {
    sendMail
};