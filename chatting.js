function scrollToBottom (id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
 }
 function isWhitespaceOrEmpty(text) {
    return !/[^\s]/.test(text);
 }

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ' ' + year + ' ' + hour + ' ' + min + ' ' + sec ;
    return time;
}
function sendMessage() {
    var message = document.getElementById("typing-box").value;
    logMessage(message);
    var propic = firebase.auth().currentUser.photoURL;
    var name = firebase.auth().currentUser.displayName;
    let unix_time = Date.now()/1000;
    let true_time = timeConverter(unix_time);
    let time_arr = true_time.split(" ");
    let hours = time_arr[3];
    let minutes = time_arr[4];
    let amPM = "";
    if (hours > 12) {
        hours -=12 ;
        amPM = "PM";
    }
    else {
        amPM = "AM";
    }
    let current_time = hours + ":" + minutes + " " + amPM;
    var html = '<div class="message-box my-message-box">' + 
    '<img id = "message-pic" src = "' + propic + '"/>' +
    '<div class="message-name"> ' + name + ' </div>' +
    '<div class="message-time"> ' + current_time + ' </div>' +
    '<div class="message my-message"> ' + message + ' </div>' + 
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

let loadMessageCount = 1;
async function loadMessages() {
    let loadMessageCountPrev = loadMessageCount-1;
    let messageCollection = db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages").orderBy("time");
    let querySnapshot = await messageCollection.get();
    let arrayOfDocs = querySnapshot.docs;
    let messageStart = arrayOfDocs.length - loadMessageCount*15;
    let messageEnd = arrayOfDocs.length - loadMessageCountPrev*15;
    let loadedArr = arrayOfDocs.slice(messageStart, messageEnd)
    let htmlNew = "";
    let htmlOld = document.getElementById("message-area").innerHTML;
    for (const doc of loadedArr) {
        let text = doc.data()["text"];
        let uid = doc.data()["uid"];
        let unix_time = doc.data()["time"];
        let true_time = timeConverter(unix_time);
        let time_arr = true_time.split(" ");
        let hours = time_arr[3];
        let minutes = time_arr[4];
        let amPM = "";
        if (hours > 12) {
            hours -=12 ;
            amPM = "PM";
        }
        else {
            amPM = "AM";
        }
        let current_time = hours + ":" + minutes + " " + amPM;
        console.log(current_time);

        let docRef = db.collection("users").doc(uid);
        let doc1 = await docRef.get().catch(err => {
            console.log(err);
        });

        let propic = doc1.data()["profilePicUrl"];
        let firstName = doc1.data()["firstName"];
        let lastName = doc1.data()["lastName"];
        let name = firstName + " " + lastName;

        htmlNew += '<div class="message-box-up my-message-box">' + 
        '<img id = "message-pic" src = "' + propic + '"/>' +
        '<div class="message-name"> ' + name + ' </div>' +
        '<div class="message-time"> ' + current_time + ' </div>' +
        '<div class="message my-message"> ' + text + ' </div>' + 
        '<div class="separator"></div>' +
        '</div>';
    }

    document.getElementById("message-area").innerHTML = htmlNew + htmlOld;
    console.log(document.getElementById("message-area").innerHTML);
    if (loadMessageCount ===1){
        var element = document.getElementById("message-area-wrapper");
        element.scrollTop = element.scrollHeight;
    }
    loadMessageCount+=1;
}

async function loadNewMessage() {

        let messageCollection = db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages").orderBy("time");
        let querySnapshot = await messageCollection.get();
        let arrayOfDocs = querySnapshot.docs;
        const doc = arrayOfDocs[arrayOfDocs.length-1]
        let html = "";
        let text = doc.data()["text"];
        let uid = doc.data()["uid"];
        let unix_time = doc.data()["time"];
        let true_time = timeConverter(unix_time);
        let time_arr = true_time.split(" ");
        let hours = time_arr[3];
        let minutes = time_arr[4];
        let amPM = "";
        if (hours > 12) {
            hours -=12 ;
            amPM = "PM";
        }
        else {
            amPM = "AM";
        }
        let current_time = hours + ":" + minutes + " " + amPM;
        if (firebase.auth().currentUser.uid !== uid) {
            let docRef = db.collection("users").doc(uid);
            let doc1 = await docRef.get().catch(err => {
                console.log(err);
            });

            let propic = doc1.data()["profilePicUrl"];
            let firstName = doc1.data()["firstName"];
            let lastName = doc1.data()["lastName"];
            let name = firstName + " " + lastName;

            html += '<div class="message-box my-message-box">' + 
            '<img id = "message-pic" src = "' + propic + '"/>' +
            '<div class="message-name"> ' + name + ' </div>' +
            '<div class="message-time"> ' + current_time + ' </div>' +
            '<div class="message my-message"> ' + text + ' </div>' + 
            '<div class="separator"></div>' +
            '</div>';
            document.getElementById("message-area").innerHTML += html;
            var element = document.getElementById("message-area-wrapper");
            element.scrollTop = element.scrollHeight;
        }
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
        let message = document.getElementById("typing-box").value;
        if (!isWhitespaceOrEmpty(message)) {
            sendMessage();   
        }
        else {
            console.log("not valid");
        }
    }
});

document.getElementById('message-area-wrapper').addEventListener('scroll',function(){
    var scrollTop = document.getElementById('message-area-wrapper').scrollTop;
    var scrollHeight = document.getElementById('message-area-wrapper').scrollHeight;
    var offsetHeight = document.getElementById('message-area-wrapper').offsetHeight;
    console.log(scrollTop);
    console.log(scrollHeight);
    if (scrollTop == 0) {
        loadMessages();
    }
    /*
    if (scrollTop === (scrollHeight-offsetHeight)) {
        i-=1;
        loadMessages(i);
    }
    */
});
db.collection("chats").doc("6!GSE Precalculus!Chung Ho").collection("messages")
    .onSnapshot((doc) => {
        loadNewMessage();
    });
