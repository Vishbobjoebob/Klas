function scrollToBottom (id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
 }
function sendMessage() {
    var message = document.getElementById("typing-box").value;
    var html = '<div class="message-box my-message-box">' +
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
