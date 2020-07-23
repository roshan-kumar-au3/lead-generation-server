require('dotenv').config()
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//My Routes -> load routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const leadRoutes = require('./routes/lead');
const funnelRoutes = require('./routes/funnel');

// Mongo Db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log(`DB NOT CONNECTED :( `);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// My Routes -> use routes

app.use("/api", authRoutes);

app.use("/api", userRoutes);

app.use("/api", leadRoutes);

app.use("/api", funnelRoutes);

// Port
const port = process.env.PORT || 8000;

// const users = {};

// io.on('connection', socket => {
//     if (!users[socket.id]) {
//         users[socket.id] = socket.id;
//     }
//     socket.emit("yourID", socket.id);
//     io.sockets.emit("allUsers", users);
//     socket.on('disconnect', () => {
//         delete users[socket.id];
//     })

//     socket.on("callUser", (data) => {
//         io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
//     })

//     socket.on("acceptCall", (data) => {
//         io.to(data.to).emit('callAccepted', data.signal);
//     })
// });

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    console.log("A user joined")
    socket.on("join room", roomID => {
    console.log("roomid" , roomID)
    console.log("socketid", socket.id)
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

server.listen(port, () => {
    console.log(`Server started at port ${port}`)
});