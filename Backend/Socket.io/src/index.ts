import express from 'express';
import path from 'path'
import { Server } from 'socket.io';
import http from "http";
import cors from 'cors';
import { JoinRoomData, IUsers } from './utils/types';
import { countdown } from './utils/countdown';

const app = express();
const server = http.createServer();

app.use(cors());

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(express.static(path.join(__dirname, 'public')))

let socketsConnected = new Set()
export const waitingRoomOne = "waitingRoomOne";
export const waitingRoomTwo = "waitingRoomTwo";
export const usersInWaitingRoom: IUsers[] = [];
let seconds = 30;

io.on('connection', onConnected)

function onConnected(socket: any) {
  console.log(socket.id)
  socketsConnected.add(socket.id)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConnected.delete(socket.id)
    io.emit('clients-total', socketsConnected.size)
    const index = usersInWaitingRoom.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      usersInWaitingRoom.splice(index, 1);
    }
    io.emit("usersCount", usersInWaitingRoom.length);
    io.emit("usersInWaitingRoom", usersInWaitingRoom);
  })

  socket.on("joinRoom", (data: JoinRoomData) => {
    const { username, avatar } = data;
    console.log("Room", waitingRoomOne, "created");
    let user;

    if (usersInWaitingRoom.length === 0) {
      user = {
        id: socket.id,
        username: username,
        avatar: avatar,
        room: socket.id,
      };
      usersInWaitingRoom.push(user);
      socket.join(waitingRoomOne);
      countdown(waitingRoomOne);
    } else if (usersInWaitingRoom.length > 0 && usersInWaitingRoom.length < 5) {
      user = {
        id: socket.id,
        username: username,
        avatar: avatar,
        room: usersInWaitingRoom[0].room,
      };
      usersInWaitingRoom.push(user);
      socket.join(waitingRoomOne);
    } else if (usersInWaitingRoom.length > 5) {
      user = {
        id: socket.id,
        username: username,
        avatar: avatar,
        room: usersInWaitingRoom[5].room,
      };
      usersInWaitingRoom.push(user);
      socket.join(waitingRoomTwo);
    }

    // Emit only to users in the same room
    io.to(waitingRoomOne).emit("usersCount", usersInWaitingRoom.length);
    io.to(waitingRoomOne).emit("usersInWaitingRoom", usersInWaitingRoom);
    console.log(usersInWaitingRoom)
  });

  socket.on("leaveRoom", () => {
    console.log("User leave room");
    // Remove user from waiting room when logout
    const index = usersInWaitingRoom.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      usersInWaitingRoom.splice(index, 1);
    }
    io.emit("usersCount", usersInWaitingRoom.length);
    io.emit("usersInWaitingRoom", usersInWaitingRoom);
  });

  socket.on("score", (data: any) => {
    console.log("answer", data)
    // io.to(waitingRoomOne).emit("")
  })
}

server.listen(3000, () => {
  console.log(`Server Is Running`);
});
