//render messages:
// console.log(window.location.pathname);
async function handleMessage (friendId){  
    try {
        const data = await $.ajax({
            url: '/conversation/' + friendId,
            type: 'post',     
        })

    const messages = data.messages
    var userId = data.userId
    var convId = data.convId
    $( ".chatBoxTop" ).attr( "userId" , userId);
    $( ".chatBoxTop" ).attr("convId" , convId)
       $('.chatBoxTop').html("")
       messages.map(item => {
        var timeCreate =new Date( item.createdAt).toString()
       
        if( item.sender.localeCompare(friendId) === 0){
            var messageHTML = `
            <div class="message">
            <div class="messageTop">
            <img class="messageImg" src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
            <p class="messageText">${item.text}</p>
            </div>
            <div class="messageBottom">
            ${timeCreate}
            </div>
            </div>`
            $('.chatBoxTop').append(messageHTML)
           } else {
            var messageHTML = `
            <div class="message own">
            <div class="messageTop">
            <img class="messageImg" src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
            <p class="messageText">${item.text}</p>
            </div>
            <div class="messageBottom">
            ${timeCreate}
            </div>
            </div>`
            $('.chatBoxTop').append(messageHTML)
           }
 
//render messages to chatBoxTop:
      
       })
    } catch (error) {
       console.log(error); 
    }
}
