console.log(firebase);
var db = firebase.database();
var LoginEmail,LoginPassword;

function dataStore(){
  var FName     =  document.getElementById('FName').value.trim();
  var MName     =  document.getElementById('MName').value.trim();
  var LName     =  document.getElementById('LName').value.trim();
  var dob       =  document.getElementById('DOB').value.trim();
  var DLNo      =  document.getElementById('DLNo').value.trim();
  var VRNo      =  document.getElementById('VRNo').value.trim();
  var VManu     =  document.getElementById('VManu').value.trim();
  var VModel    =  document.getElementById('VModel').value.trim();
  var email     =  document.getElementById('email').value.trim();
  var Phone     =  document.getElementById('Phone').value.trim();
  var password  =  document.getElementById('password').value.trim();
  var Cpassword  =  document.getElementById('Cpassword').value.trim();
  var hash      =  window.btoa(password);

  if(document.getElementById("exampleRadios1").checked)
    var accType = document.getElementById("exampleRadios1").value.trim();
  else
  var accType = document.getElementById("exampleRadios2").value.trim();
  //window.atob()

  if(email == "" || password == "" || Cpassword == "" || DLNo == ""){
    window.alert("Empty fields!");
    window.location.reload();
    return;
  }

  if(password != Cpassword){
    window.alert("Passwords Mismatch! Click OK to re-register.");
    window.location.reload();
    return;
  }

  var user = {
    FName     : FName,
    MName     : MName,
    LName     : LName,
    DOB       : dob,
    DLNo      : DLNo,
    VRNo      : VRNo,
    VManu     : VManu,
    VModel    : VModel,
    Email     : email,
    Phone     : Phone,
    Password  : hash,
    accType   : accType
  };
  var ref = db.ref("Registration/" + window.btoa(email));
  ref.set(user)
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  window.alert("You are registered. Click OK to Login.");
  window.location.href='./login-page';
}

function retrieveData(){
  LoginEmail     =  document.getElementById('LoginEmail').value;
  LoginPassword  =  document.getElementById('LoginPassword').value;

  var ref = db.ref("Registration");
  ref.on('value', getData, errData);
}

function getData(data){
  var userCredentials = data.val();
  var keys = Object.keys(userCredentials);
  console.log(keys);
  var tmp = 0;
  for(var i = 0; i < keys.length; i++){
    if(keys[i] == window.btoa(LoginEmail)){
      if(window.btoa(LoginPassword) != userCredentials[keys[i]].Password)
        invalidCombo();
      else{
        console.log("Login Successful!");
        localStorage.setItem( 'objectToPass', window.btoa(LoginEmail));
        if(userCredentials[keys[i]].accType == "driver")
          window.location.href='./dashboardD';
        else
        window.location.href='./dashboardO';
      }
      tmp = 1;
    }
  }
  if(tmp == 0)
    invalidCombo();
}

function errData(data){
  console.log("Error!");
  console.log(err);
}

function invalidCombo(){
  window.alert("Invalid credentials");
  window.location.reload();
}