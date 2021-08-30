//Needs to be changed from authHome because different buttons
let provider = new firebase.auth.GoogleAuthProvider();
const db=firebase.firestore();

function GoogleLogin() {
    console.log("Login Detected")
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      var provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {

        onSignIn(result.user);
        
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
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

function onSignIn(googleUser) {
  console.log(googleUser.photoURL);
  document.getElementById('profile-pic').innerHTML = '<a href = "schedule.html"><img id = "pro-pic" src = "' + googleUser.photoURL + '"/></a>';
  document.getElementById('google-sign-up').style.display="none";
  document.getElementById('logout-button').style.display="block";

  var docRef = db.collection("users").doc(googleUser.uid);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          onNewSignIn(googleUser);
          window.location = "schedule.html";
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}

function onNewSignIn(googleUser) {
  let name = googleUser.displayName ;
  let first = name.substring(0, name.indexOf(" "));
  let last = name.substring(name.indexOf(" ") + 1, name.length);
  let photoURL = googleUser.photoURL ;

  db.collection("users").doc(googleUser.uid).set({
    firstName: first,
    lastName: last,
    uid: googleUser.uid,
    profilePicUrl: photoURL
  })


}

function LogoutUser() {
    console.log("Logout Detected");
    firebase.auth().signOut().then(()=>{
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
    window.location="signup.html"
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("state = definitely signed in")
    onSignIn(firebase.auth().currentUser);
  }
  else {
    console.log("state = definitely signed out")
  }
})

document.getElementById('google-sign-up').addEventListener('click', GoogleLogin);
document.getElementById('logout-button').addEventListener('click', LogoutUser);
