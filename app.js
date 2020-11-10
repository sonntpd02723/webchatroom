const express = require("express");
const app = express();
var path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, "public")));
var dsUser = [];
var mangroom = [];
io.on("connection", function (socket) {
  console.log("có người kết nối" + socket.id);

  socket.on("disconnect", function () {
    console.log("good bye" + socket.id);
  });

  socket.on("Client-tao-data", function (data) {
    if (dsUser.indexOf(data) >= 0) {
      socket.emit("Server-tao-thatbai");
    } else {
      dsUser.push(data);
      socket.Username = data;
      socket.emit("Server-tao-thanhcong", data);
      io.sockets.emit("Server-danhsach-listUser", dsUser);
    }
  });
  socket.on("User-logout", function () {
    dsUser.splice(
    dsUser.indexOf(socket.Username), 1
    );
    socket.broadcast.emit("Server-danhsach-listUser", dsUser);
  });
  socket.on("Client-send-data", function (data) {
    io.sockets.emit("Server-send-data", { un: socket.Username, nd: data });
  });
  socket.on("tao-room", function (data) {

    if(mangroom.indexOf(data) >=0 ){
      socket.join(data);
      socket.Phong = data;
    
    }else{
      socket.join(data);
      socket.Phong = data;
      mangroom.push(data);
    }
     io.sockets.emit("Server-send-all-room", mangroom);
     socket.emit("Server-send-room-ht", data)
});
  socket.on("Dang-nhap-tin-nhan", function () {
    var s = socket.Username + " đang nhập tin nhắn";
    io.sockets.emit("ai-dang-go-chu", s);
  });

  socket.on("Ngung-nhap-tin-nhan", function () {
    io.sockets.emit("ai-dang-ngung-go-chu");
  });
  socket.on("User-send-data-room", function(data){
    io.sockets.in(socket.Phong).emit("Server-send-data-room",{ un: socket.Username, nd: data});
  //  socket.in(socket.Phong).emit("Server-send-data-room-2", data);
  })
});
const index_r = require("./router/index.js");

app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/views", index_r);
server.listen(3000, (req, res) => {
  console.log("truy cập localhost:3000");
});
