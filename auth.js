let provider = new firebase.auth.GoogleAuthProvider();

function GoogleLogin() {
    console.log("Login Detected");
    firebase.auth().signInWithPopUp(provider).then(res=>{
        console.log(res)
    }).catch(e=>{
        console.log(e)
    })
}

function LogoutUser() {
    console.log("Logout Detected");
}

document.getElementById('login-button').addEventListener('click', GoogleLogin);
document.getElementById('logout-button').addEventListener('click', LogoutUser);

