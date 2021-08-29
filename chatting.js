let scheduleLoadCounter = 0;
var currentChat = "";
var globalSchedule = [];
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

function sendMessage(chatID) {
    var message = document.getElementById("typing-box").value;
    logMessage(message, chatID);
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
    var html = "";
    var chat_select = document.getElementById("selection-bar")

    var docRef = db.collection("users").doc(user.uid);

    let doc = await docRef.get().catch(err => {
    console.log(err);
    });
    let schedule = doc.data()["schedule"];
    let scheduleNotChanged = doc.data()["schedule"];
    globalSchedule = scheduleNotChanged;

    for (let i = 0; i < schedule.length; i++) {
        schedule[i] = schedule[i].substring(schedule[i].indexOf("!")+1)
        schedule[i] = schedule[i].substring(0, schedule[i].indexOf("!"))
    }
    //console.log(schedule)
    
    html += '<ul id="schedule-list">';
    for (let i = 0; i < schedule.length; i++) {
        let periodNumber = i+1;
        html += '<li class="period-class">' + periodNumber + " - " + schedule[i] + '</li>'
    }
    chat_select.innerHTML += html;
    chat_select.innerHTML += "</ul>";
    console.log(chat_select.innerHTML);
    
    //Get Click Index
    var items = document.querySelectorAll("#schedule-list li");
    let tab = [];
    let index;
    for (var i = 0; i < items.length; i++) {
        tab.push(items[i].innerHTML)
    }
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function() {
            index = tab.indexOf(this.innerHTML)
            loadMessages(scheduleNotChanged[index])
            currentChat = scheduleNotChanged[index];
        }
    }

    console.log(scheduleNotChanged);

    
}

async function getSchedule(user) {
    var docRef = db.collection("users").doc(user.uid);
    let doc = await docRef.get().catch(err => {
        console.log(err);
        });
    globalSchedule = doc.data()["schedule"];
}
let loadMessageCount = 1;
async function loadMessages(chatID) {
    console.log(chatID);
    console.log(currentChat);
    if (chatID !== currentChat) {
        loadMessageCount = 1;
        document.getElementById("message-area").innerHTML = "";
    }
    let loadMessageCountPrev = loadMessageCount-1;
    let messageCollection = db.collection("chats").doc(chatID).collection("messages").orderBy("time");
    let querySnapshot = await messageCollection.get();
    let arrayOfDocs = querySnapshot.docs;
    let messageStart = arrayOfDocs.length - loadMessageCount*15;
    let messageEnd = arrayOfDocs.length - loadMessageCountPrev*15;
    if ((messageStart < 0 || !messageEnd < 0) && loadMessageCount > 1) {
        console.log("exceeded message stack")
    }
    else {
        let loadedArr = arrayOfDocs.slice(messageStart, messageEnd)
        let htmlNew = "";
        let htmlOld = document.getElementById("message-area").innerHTML;
        let prevDate = [];
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
        if (loadMessageCount ===1){
            var element = document.getElementById("message-area-wrapper");
            element.scrollTop = element.scrollHeight;
        }
        loadMessageCount+=1;
    }
}

function loadWelcome() {
    
}

async function loadNewMessage(chatID) {

        let messageCollection = db.collection("chats").doc(chatID).collection("messages").orderBy("time");
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
        console.log("new message detected");
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

function logMessage(message, chatID) {
    let user = firebase.auth().currentUser;
    let storedMessage = db.collection("chats").doc(chatID).collection("messages").doc()
    storedMessage.set({
        id: storedMessage.id,
        isImage: false,
        text: message,
        uid: user.uid,
        time: Date.now()/1000
    })
}

async function logScheduleClick() {
    var items = document.querySelectorAll("#schedule-list li");
    let tab = [];
    let index;
    for (var i = 0; i < items.length; i++) {
        tab.push(items[i].innerHTML)
    }
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function() {
            index = tab.indexOf(this.innerHTML)
            console.log(index)
        }
    }

    console.log(tab);
}


firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loadSchedule(user);
    }
    else {
      console.log("bruh")
    }
  })

document.getElementById('typing-box').addEventListener('keypress', function(e){
    if (e.keyCode == 13) {
        let message = document.getElementById("typing-box").value;
        if (!isWhitespaceOrEmpty(message)) {
            sendMessage(currentChat);   
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
    if (scrollTop == 0) {
        loadMessages(currentChat);
    }
    /*
    if (scrollTop === (scrollHeight-offsetHeight)) {
        i-=1;
        loadMessages(i);
    }
    */
});

//document.getElementById('schedule-list').addEventListener('click', function(e){});

db.collection("chats").doc(currentChat).collection("messages")
    .onSnapshot((doc) => {
        loadNewMessage(currentChat);
        console.log(currentChat);
    });

