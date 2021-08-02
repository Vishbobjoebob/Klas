let provider = new firebase.auth.GoogleAuthProvider();
const db=firebase.firestore();

function GoogleLogin() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // code which runs on success'
        onSignIn(result.user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        alert(errorCode);
      
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("state = definitely signed in")
      }
      else {
        console.log("state = definitely signed out")
      }
    })
}

function onSignIn(googleUser) {
  let name = googleUser.displayName ;
  let first = name.substring(0, name.indexOf(" "));
  let last = name.substring(name.indexOf(" ") + 1, name.length);
  let photoURL = googleUser.photoURL ;

  console.log(googleUser.photoURL);
  document.getElementById('profile-pic').innerHTML = '<img id = "pro-pic" src = "' + googleUser.photoURL + '"/>';
  document.getElementById('google-sign-up').style.display="none";
  document.getElementById('login-button').style.display="none";
  document.getElementById('logout-button').style.display="block";

  db.collection("users").doc(googleUser.uid).set({
    firstName: first,
    lastName: last,
    uid: googleUser.uid,
    profilePicURL: photoURL
  })
}

function LogoutUser() {
    console.log("Logout Detected");
    firebase.auth().signOut().then(()=>{
      document.getElementById("login-button").style.display="block";
      document.getElementById('google-sign-up').style.display="block";
      document.getElementById("pro-pic").style.visibility="hidden";
      document.getElementById('logout-button').style.display="none";
    }).catch(e=>{
      console.log(e);
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("state = definitely signed in")
      }
      else {
        console.log("state = definitely signed out")
      }
    })
}

$(document).ready(function() {
  console.log( "testing.." );
  var user = firebase.auth().currentUser;
  console.log(user);
});
document.getElementById('google-sign-up').addEventListener('click', GoogleLogin);
document.getElementById('login-button').addEventListener('click', GoogleLogin);
document.getElementById('logout-button').addEventListener('click', LogoutUser);