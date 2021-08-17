function scrollToBottom (id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
 }
function sendMessage() {
    var message = document.getElementById("typing-box").value;
    logMessage(message);
    var html = '<div class="message-box my-message-box">' + '<img id = "message-pic" src = "' + firebase.auth().currentUser.photoURL + '"/>' +
    '<div class="message my-message"> ' + message +' </div>' +
    '<div class="separator"></div>' +
    '</div>';
    document.getElementById("message-area").innerHTML += html;
    document.getElementById("typing-box").value = "";
    // To scroll to the bottom of a div
    var element = document.getElementById("message-area-wrapper");
    console.log(element.constructor.name);
    element.scrollTop = element.scrollHeight;
}

async function loadSchedule(user) {
    var chat_select = document.getElementById("selection-bar")

    var docRef = db.collection("users").doc(user.uid);

    let doc = await docRef.get().catch(err => {
    console.log(err);
    });
    let schedule = doc.data()["schedule"];

    for (let i = 0; i < schedule.length; i++) {
        schedule[i] = schedule[i].substring(schedule[i].indexOf("!")+1)
        schedule[i] = schedule[i].substring(0, schedule[i].indexOf("!"))
    }
    console.log(schedule)
    
    chat_select.innerHTML += '<ul id="schedule-list">'
    for (let i = 0; i < schedule.length; i++) {
        chat_select.innerHTML += '<li><a href="">' + schedule[i] + '</a></li>'
    }
    chat_select.innerHTML += "</ul>"
    
}

async function loadMessages() {
    let messageCollection = db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages").orderBy("time");
    let querySnapshot = await messageCollection.get();
    let arrayOfDocs = querySnapshot.docs;
    console.log(arrayOfDocs[1])
    let html = "";
    for (const doc of arrayOfDocs) {
        let text = doc.data()["text"];
        let uid = doc.data()["uid"];

        let docRef = db.collection("users").doc(uid);
        let doc1 = await docRef.get().catch(err => {
            console.log(err);
        });

        let propic = doc1.data()["profilePicUrl"];

        html += '<div class="message-box my-message-box">' + '<img id = "message-pic" src = "' + propic + '"/>' +
        '<div class="message my-message"> ' + text + ' </div>' +
        '<div class="separator"></div>' +
        '</div>';
    }
    document.getElementById("message-area").innerHTML += html;
    var element = document.getElementById("message-area-wrapper");
    element.scrollTop = element.scrollHeight;
    
}

async function loadNewMessage() {
    let messageCollection = db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages").orderBy("time");
    let querySnapshot = await messageCollection.get();
    let arrayOfDocs = querySnapshot.docs;
    const doc = arrayOfDocs[arrayOfDocs.length-1]
    let html = "";
    let text = doc.data()["text"];
    let uid = doc.data()["uid"];

    let docRef = db.collection("users").doc(uid);
    let doc1 = await docRef.get().catch(err => {
        console.log(err);
    });

    let propic = doc1.data()["profilePicUrl"];

    html += '<div class="message-box my-message-box">' + '<img id = "message-pic" src = "' + propic + '"/>' +
    '<div class="message my-message"> ' + text + ' </div>' +
    '<div class="separator"></div>' +
    '</div>';
    document.getElementById("message-area").innerHTML += html;
    var element = document.getElementById("message-area-wrapper");
    element.scrollTop = element.scrollHeight;

    /*
    var docRef = db.collection("users").doc(user.uid);

    let doc = await docRef.get().catch(err => {
    console.log(err);
    });
    let schedule = doc.data()["schedule"];
    */
}

function logMessage(message) {
    let user = firebase.auth().currentUser;
    let storedMessage = db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages").doc()
    storedMessage.set({
        id: storedMessage.id,
        isImage: false,
        text: message,
        uid: user.uid,
        time: Date.now()/1000
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loadSchedule(user)
      loadMessages();
    }
    else {
      console.log("bruh")
    }
  })

document.getElementById('typing-box').addEventListener('keypress', function(e){
    if (e.keyCode == 13) {
        if (document.getElementById("typing-box").value != '') {
            console.log(document.getElementById("typing-box").value)
            sendMessage();   
        }
    }
});

db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages")
    .onSnapshot((doc) => {
        loadNewMessage();
    });