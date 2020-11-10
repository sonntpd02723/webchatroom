var socket = io("http://localhost:3000");

 socket.on("Server-send-data", function(data){
        $("#noidung").append(data+ "+");
    });
    
$(document).ready(function(){
$("#mrA").click(function(){
    socket.emit("Client-send-data", "hello");
});
});