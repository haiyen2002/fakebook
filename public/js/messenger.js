
var pathUrl = window.location.pathname;


var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

//gửi từ client lên server:
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', {msg:input.value, datetime: new Date()});
    var p = document.createElement("p");
    p.classList.add("sent");
    var li = document.createElement("li");
    p.appendChild(li);
    li.textContent = input.value;
    messages.appendChild(p);
    input.value = '';
  }
});

socket.on("chat message", function (data) {
    var p = document.createElement("p");
    p.classList.add("receive");
    var li = document.createElement("li");
    var span = document.createElement("span");

    p.appendChild(span);
    p.appendChild(li);
    li.textContent = data.msg;
    messages.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);
  });


async function handleSubmitSend(){
    const userId = $('.chatBoxTop').attr("userId")
   const convId = $('.chatBoxTop').attr("convId")
    const text = $('.chatMessageInput').val()
  
    try {
        const messages = await $.ajax({
            url: '/message',
            type: 'post',   
            data: {
                sender : userId,
                text: text,
                conversationId : convId
            }  
        })
        console.log(messages)
      
    } catch (error) {
        console.log(error);
    }
}