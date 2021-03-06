var db = firebase.database();

var objectRec, userData;
var usrID = localStorage['objectToPass'];
refDB = db.ref("Registration/" + usrID + "/accType");
refDB.once("value", function(snapshot) {
    userData = snapshot.val();
});
fetch();


//abhishek18296@gmail.com

function fetch(){
    if (localStorage.getItem("objectToPass") === null) {
        window.alert("Login to continue....");
        window.location.href = '/login-page';
    }

    var userId = localStorage['objectToPass'];
    // localStorage.removeItem( 'objectToPass' );
    
    var ref = db.ref("Registration/" + userId);
    ref.on("value", gotOne, errData);

    /*
    var ref = db.ref("Registration/c2luaGFyaW5pMTBAZ21haWwuY29t/Fine/");
    ref.update({"y2018" : {
        "APR" : [ null, {
          "Amount" : 0,
          "Category" : "No Fine",
          "Date" : "No Fine in APR",
          "Place" : "No Fine"
        } ],
        "AUG" : [ null, {
          "Amount" : 1000,
          "Category" : "No Parking",
          "Date" : "15-AUG",
          "Place" : "Parade Road"
        } ],
        "DEC" : [ null, {
          "Amount" : 650,
          "Category" : "Helmet",
          "Date" : "09-DEC",
          "Place" : "Market"
        } ],
        "FEB" : [ null, {
          "Amount" : 100,
          "Category" : "Speeding",
          "Date" : "18-FEB",
          "Place" : "Highway"
        } ],
        "JAN" : [ null, {
          "Amount" : 500,
          "Category" : "Helmet",
          "Date" : "12-JAN",
          "Place" : "Station"
        } ],
        "JUL" : [ null, {
          "Amount" : 250,
          "Category" : "Helmet",
          "Date" : "10-JUL",
          "Place" : "Company area"
        } ],
        "JUN" : [ null, {
          "Amount" : 100,
          "Category" : "No Entry",
          "Date" : "01-JUN",
          "Place" : "Market"
        } ],
        "MAR" : [ null, {
          "Amount" : 900,
          "Category" : "Signal",
          "Date" : "14-MAR",
          "Place" : "4 Way"
        } ],
        "MAY" : [ null, {
          "Amount" : 1500,
          "Category" : "No Parking",
          "Date" : "05-MAY",
          "Place" : "City Mall"
        } ],
        "NOV" : [ null, {
          "Amount" : 100,
          "Category" : "Speeding",
          "Date" : "14-NOV",
          "Place" : "School"
        } ],
        "OCT" : [ null, {
          "Amount" : 700,
          "Category" : "Speeding",
          "Date" : "02-OCT",
          "Place" : "Expressway"
        } ],
        "SEP" : [ null, {
          "Amount" : 500,
          "Category" : "Signal Break",
          "Date" : "05-SEP",
          "Place" : "Market"
        }, {
          "Amount" : 100,
          "Category" : "No Parking",
          "Date" : "10-SEP",
          "Place" : "Park"
        } ]
      }});
    */
    
}

function gotOne(data){
    objectRec = data.val();
    document.getElementById("userName").innerHTML = objectRec.FName + " " + objectRec.MName + " " + objectRec.LName;
    document.getElementById("userName").style.visibility = "visible";
    if(document.getElementById('carSelector'))
        document.getElementById('carSelector').innerHTML = "<i class='now-ui-icons transportation_bus-front-12'></i>VR NO. : " + objectRec.VRNo;
    if(document.getElementById('headLabel').innerText == "DASHBOARD")
        document.getElementById("tktNo").innerHTML = "FINE TICKET #" + objectRec.TktNo;
    autoType(".type-js",200);
    populateCarList();
    if(userData == "driver" && document.getElementById("headLabel").innerText === "DASHBOARD")
        displayTable();
    if(document.getElementById("headLabel").innerText === "HISTORY")
        if(userData == "driver")
            displayHistoryTableD();
        else
            displayHistoryTableO();
    if(document.getElementById("headLabel").innerText === "PROFILE")
        displayUserForm(objectRec, 0);
    
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
}
function errData(err){
    console.log(err);
}



function displayUserForm(userObj, flg){
    if(userObj.accType == "official")
        document.getElementById("hideIfO").style.display = "none";
    if(userObj.accType == "driver" && flg == 0){
        document.getElementById("hideIfD").style.display = "none";
        document.getElementById("hideIfD1").style.display = "none";
    }
    document.getElementById("FName").value = userObj.FName;
    document.getElementById("LName").value = userObj.LName;
    document.getElementById("formDLNo").value = userObj.DLNo;
    document.getElementById("DOB").value = userObj.DOB;
    document.getElementById("Email").value = userObj.Email;
    document.getElementById("Phone").value = userObj.Phone;
    document.getElementById("VManu").value = userObj.VManu;
    document.getElementById("VModel").value = userObj.VModel;
    document.getElementById("VRNo").value = userObj.VRNo;
    document.getElementById("cardName").innerHTML = userObj.FName + " " + userObj.LName;
    document.getElementById("cardDLNo").innerHTML = userObj.DLNo;

    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
}


function displayTable(){
    var mnt = "NOV";
    var keys,tableCnt = "";
    var userId1 = localStorage['objectToPass'];

    var refDB = db.ref("Registration/" + userId1 + "/Fine/y2018/" + mnt);
    refDB.once("value", function(snapshot) {
        var chartData = snapshot.val();
        keys = Object.keys(chartData);
        // console.log(keys);
    });
    for(var j = 0; j < keys.length; j++){
        refDB = db.ref("Registration/" + userId1 + "/Fine/y2018/" + mnt + "/" + keys[j]);
        
        refDB.once("value", function(snapshot) {
            var chartData = snapshot.val();
            tableCnt += "<tr><td>" + keys[j] + "</td><td>" + chartData.Date + "</td><td>" + chartData.Category + "</td><td>" + chartData.Place + "</td><td class='text-right'>&#8377 " + chartData.Amount + "</td></tr>";
        });
    }
    var tBody = document.getElementById("tableBody");
    if(tBody)   tBody.innerHTML = tableCnt;
}

function populateCarList(){
    var keys,uEmail,tableCnt = "";
    var userId1 = localStorage['objectToPass'];
    var refDB = db.ref("Registration/" + userId1);
    refDB.once("value", function(snapshot) {
        var chartData = snapshot.val();
        uEmail = chartData.Email;
    });

    var refDB = db.ref("Registration");
    refDB.on("value", function(snapshot) {
        var chartData = snapshot.val();
        keys = Object.keys(chartData);
        // console.log(keys);
        for(var j = 0; j < keys.length; j++){
            if(keys[j] != "mailService"){
                refDB = db.ref("Registration/" + keys[j]);
                
                refDB.once("value", function(snapshot) {
                    var chartData = snapshot.val();
                    if(chartData.Email == uEmail){
                        tableCnt += "<a class='dropdown-item' href='#' onclick='switchCar(`" + keys[j] + "`)'># " + chartData.VRNo + "</a>\n";
                    }
                });
            }
        }
        var tBody = document.getElementById("carList");
        if(tBody)   tBody.innerHTML = tableCnt;
    });
}

function switchCar(car){
    console.log(car + " clicked!");
    localStorage.removeItem( 'objectToPass' );
    localStorage.setItem( 'objectToPass', car);
    window.location.reload();
}

function searchIT(){

    var flag = 0;
    var refDB = db.ref("Registration");
    refDB.on("value", function(snapshot) {
        var userr = snapshot.val();
        var keys = Object.keys(userr);
        // console.log(keys);
        for(var j = 0; j < keys.length; j++){
            refDB = db.ref("Registration/" + keys[j]);
            refDB.on("value", function(snapshot) {
                var userrData = snapshot.val();
                if(userrData.VRNo == document.getElementById("searchVR").value){
                    document.getElementById("showResult").style.display = "block";
                    document.getElementById("searchCard").style.display = "none";
                    displayUserForm(userrData, 1);
                    window.alert("Found!");flag = 1;
                    return;
                }
            });
        }
        if(flag == 0){
            window.alert("Sorry, VR No. not found!");
            window.location.reload();
        }
    });
}








function displayHistoryTableD(){
    if(document.getElementById("hideIfD")){
        document.getElementById("hideIfD").style.display = "none";
        document.getElementById("hideIfD1").style.display = "none";
    }
    var i,j,k;
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var keys,keys2,keys3,tableCnt = "";
    var userId1 = localStorage['objectToPass'];

    var refDB = db.ref("Registration/" + userId1 + "/Fine");
    refDB.once("value", function(snapshot) {
        var chartData = snapshot.val();
        keys = Object.keys(chartData);
        console.log(keys);
    });
    for(i = keys.length-1; i >= 0; i--){
        refDB = db.ref("Registration/" + userId1 + "/Fine/" + keys[i]);
        refDB.once("value", function(snapshot) {
            var chartData = snapshot.val();
            keys2 = Object.keys(chartData);
            var lmt = 11;
            if(keys[i] == "y2018")
                lmt = 10;
            else
                lmt = 0;                    //Remove this else when "y2017" has all months defined in Firebase
            for(j = lmt; j >= 0; j--){
                var tt = 0;
                while(tt < 12 && keys2[tt] != months[j]){tt++;}
                refDB = db.ref("Registration/" + userId1 + "/Fine/" + keys[i] + "/" + keys2[tt]);
                refDB.once("value", function(snapshot) {
                    var chartData = snapshot.val();
                    keys3 = Object.keys(chartData);
                    for(k = keys3.length - 1; k >= 0; k--){
                        refDB = db.ref("Registration/" + userId1 + "/Fine/" + keys[i] + "/" + keys2[tt] + "/" + keys3[k]);
                        refDB.once("value", function(snapshot) {
                            var chartData = snapshot.val();
                            tableCnt += "<tr><td>" + keys3[k] + "</td><td>" + chartData.Date + "-" + keys[i].substring(3) + "</td><td>" + chartData.Category + "</td><td>" + chartData.Place + "</td><td class='text-right'>&#8377 " + chartData.Amount + "</td></tr>";
                        });
                    }
                });
            }
        });
    }
    document.getElementById("historyTable").innerHTML = tableCnt;
    var tHead = '<th>Fine ID</th><th>Date</th><th>Category</th><th>Place</th><th class="text-right">Amount</th>';
    document.getElementById("tHead").innerHTML = tHead;
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
}


function displayHistoryTableO(){
    document.getElementById("hideIfO").style.display = "none";
    var tableCnt = "", tHead = '<th>Ticket ID</th><th>Driver Name</th><th>VRNo</th><th>DLNo</th><th>Reason</th><th>Location</th><th>Time</th><th class="text-right">Amount</th>';
    document.getElementById("tHead").innerHTML = tHead;
    refDB = db.ref("Registration/" + usrID + "/Tickets/");
    refDB.once("value", function(snapshot) {
        var chartData = snapshot.val();
        keys3 = Object.keys(chartData);
        for(k = keys3.length - 1; k >= 0; k--){
            refDB = db.ref("Registration/" + usrID + "/Tickets/" + keys3[k]);
            refDB.once("value", function(snapshot) {
                var chartData = snapshot.val();
                tableCnt += "<tr><td>" + keys3[k] + "</td><td>" + chartData.FName + "</td><td>" + chartData.VRNo + "</td><td>" + chartData.DLNo + "</td><td>" + chartData.fineReason + "</td><td>" + chartData.fineLoc + "</td><td>" + chartData.fineDate + "</td><td class='text-right'>&#8377 " + chartData.fineVal + "</td></tr>";
            });
        }
    });
    document.getElementById("historyTable").innerHTML = tableCnt;
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
}


function acceptFine(){
    var FName = document.getElementById("FName").value;
    var DLNo = document.getElementById("DLNo").value;
    var VRNo = document.getElementById("VRNo").value;
    var fineVal = document.getElementById("fineVal").value;
    var fineReason = document.getElementById("fineReason").value;
    var fineLoc = document.getElementById("fineLoc").value;
    var fineDate = document.getElementById("fineDate").value;

    if(DLNo == "" || VRNo == "" || fineVal == "" || FName == "" || fineReason == "" || fineLoc == "" || fineDate == ""){
        window.alert("Empty fields!");
        window.location.reload();
        return;
    }

    var ticketObj = {
        FName : FName,
        DLNo : DLNo,
        VRNo : VRNo,
        fineVal : parseInt(fineVal, 10),
        fineReason : fineReason,
        fineLoc : fineLoc,
        fineDate : fineDate.toUpperCase()
    };
    
    var toMail, chartData;
    var found = -1;
    var isMailed = 0;
    var refDB = db.ref("Registration");
    refDB.once("value", function(snapshot) {
        chartData = snapshot.val();
        var keys1 = Object.keys(chartData);
        for(var i = 0; i < keys1.length; i++){
            if(found != -1)    break;
            refDB = db.ref("Registration/" + keys1[i]);
            refDB.once("value", function(snapshot) {
                chartData = snapshot.val();
                if(chartData.VRNo == ticketObj.VRNo){
                    found = i;
                    toMail = chartData;
                    // window.alert("Found : " +toMail.Email);
                    
                    var finalMail = {
                        from: '"V M S" <noreply@v-m-s-52555.firebaseapp.com>',
                        to: toMail.Email,
                        subject: 'Fine Ticket issued | City Traffic Police',
                        html:   '<p>Hello <b>' + toMail.FName + ' ' + toMail.LName + '</b>,</p>' +
                                '<p>You have been fined with Rs. ' + fineVal + ' for ' + fineReason +
                                ' at ' + fineLoc + '.</p>' +
                                '<p>Following are the details of the driver :</p>' +
                                '<p>Name : ' + FName + '</p>' +
                                '<p>Driving Licence Number : ' + DLNo + '</p>' +
                                '<p>Vehicle Registration Number : ' + VRNo + '</p>' +
                                '<p>Date & Time : '  + fineDate + '</p><p></p>' +
                                '<p>Thank You!</p>'
                    };
                    var ref = db.ref("Registration/mailService");
                    ref.set(finalMail).then(function() {
                        console.log("Fine Mail successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing Mail Ticket : ", error);
                    });

                    var ref = db.ref("Registration/" + usrID + "/Tickets/" + objectRec.TktNo);
                    ref.set(ticketObj)
                    .then(function() {
                        console.log("Fine Ticket successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing Fine Ticket : ", error);
                    });

                    var ref = db.ref("Registration/" + usrID);
                    ref.update({"TktNo" : objectRec.TktNo + 1});

                    isMailed = 1;
                    window.alert("Found! Fine Ticket registered! An Email has been sent to Driver.");

                    //TODO
                    var fineNo;
                    refDB = db.ref("Registration/" + keys1[found] + "/Fine/y2018/NOV/");
                    refDB.once("value", function(snapshot) {
                        chartData = snapshot.val();
                        var keys2 = Object.keys(chartData);
                        // window.alert(keys2);
                        fineNo = keys2.length + 1;
                    });
                    var driverFine = {
                        Amount : parseInt(fineVal, 10),
                        Category : fineReason,
                        Date : fineDate.substring(4, 10).toUpperCase(),
                        Place : fineLoc
                    };
                    // console.log(driverFine);
                    var ref = db.ref("Registration/" + keys1[found] + "/Fine/y2018/NOV/" + fineNo);
                    ref.set(driverFine)
                    .then(function() {
                        console.log("Fine Ticket successfully written to DRIVER!");
                    })
                    .catch(function(error) {
                        console.error("Error writing Fine Ticket : ", error);
                    });
                    window.location.href = '/mailing';
                }
            });
        }
    });
    if(isMailed == 0){
        window.alert("Vechicle not registered in database!");
        window.location.reload();
    }
    // window.location.reload();
}


function gotoDashboard(){
        if(userData == "driver")
            window.location.href = '/dashboardD';
        else
            window.location.href = '/dashboardO';
}

function logoutStuff(){
    localStorage.removeItem( 'objectToPass' );
    localStorage.removeItem( 'finedDriver' );
    localStorage.removeItem( 'ticketDetails' );
    window.location.href = '/index';
}



function autoType(elementClass, typingSpeed){
    var thhis = $(elementClass);
    thhis.css({
        "position": "relative",
        "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function(){
        thhis.css("opacity",1);
        thhis.prev().removeAttr("style");
        // thhis.text("");
        for(var i = 0; i < amntOfChars; i++){
        (function(i,char){
            setTimeout(function() {        
            newString += char;
            thhis.text(newString);
            },i*typingSpeed);
        })(i+1,text[i]);
        }
    },1500);
}