import express from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";

interface IUsers {
  id: string;
  username: string;
  room: string;
}

const app = express();
const server = http.createServer();

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users: IUsers[] = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("joinRoom", ({ username }) => {
    let user;
    if (users.length === 0 || users.length === 5) {
      user = {
        id: socket.id,
        username,
        room: socket.id,
      };
      users.push(user);
      socket.join(user.room);
      console.log(users);
    } else if (users.length > 0 && users.length < 5) {
      user = {
        id: socket.id,
        username,
        room: users[0].room,
      };
      users.push(user);
      socket.join(users[0].room);
    } else {
      user = {
        id: socket.id,
        username,
        room: users[5].room,
      };
      users.push(user);
      socket.join(users[5].room);
    }
    socket.broadcast.emit("userList", users);
    socket.emit("userList", users);
    console.log(users);
  });
  socket.on("closeRoom", ({ username, room }) => {
    const index = JSON.stringify(
      users.findIndex((value) => value.username === username)
    );
    console.log("Sisa User", users);
    socket.leave(room);
    users.splice(Number(index), 1);
    io.emit("userList", users);
  });
  socket.on("sendAnswer", (dataAnswer) => {
    io.to(dataAnswer.room).emit("receiveAnswer", dataAnswer);
  });
});

server.listen(3000, () => {
  console.log(`Server Is Running`);
});
