const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser')
var port = 3000;

app.use(express.urlencoded({ extended: false }));
//socket
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


var mongoose = require('./models/dbconnect')
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(cookieParser())

const { checkUser } = require("./middlewares/checkUser");
app.use(checkUser);

const { checkLogging } = require("./middlewares/checkLogging");
app.use(checkLogging);

const ConversationRouter = require("./routes/ConversationRouter");
const UserRouter = require("./routes/UserRouter");
const MessengeRouter = require("./routes/messageRouter");
const IndexRouter = require("./routes/indexRouter");

app.use("/", IndexRouter);
app.use("/conversation", ConversationRouter);
app.use("/user", UserRouter);
app.use("/message", MessengeRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
//bên client bắn ra emit và ở đây nhận đc:
  socket.on('chat message', (data) => {
      console.log('message: ' + data);
      //server trả lời client:
      socket.broadcast.emit('chat message', data);
    });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
  