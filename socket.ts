import { DefaultEventsMap, Server } from "socket.io";
import { UserModel } from "./model/user";
import utility from "util-functions-nodejs";


export function socketCode(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    const onlineUsers: any = {}

    io.on('connection', (socket) => {

        socket.on("isOnline", async ({ selectedUser, userId }) => {
            const userData = await UserModel.findById(selectedUser)
            let lastSeen: string = utility.getDate(0, userData.lastSeen);
            if (onlineUsers[selectedUser]) {
                lastSeen = onlineUsers[selectedUser] === "online" ? onlineUsers[selectedUser] : utility.getDate(0, onlineUsers[selectedUser])
            }
            io.to(userId).emit("isOnline", { lastSeen, lastUserId: selectedUser })
        })

        socket.on('join', (userId) => {
            onlineUsers[userId] = "online"
            socket.join(userId)
        });

        socket.on("log_online", ({ userId, lastSeen }) => {
            onlineUsers[userId] = lastSeen + "" === "online" ? lastSeen : utility.getDate(0, lastSeen)
            socket.broadcast.emit("isOnline", { lastSeen: onlineUsers[userId], lastUserId: userId })
        })

        socket.on('disconnect', () => {

        });
    });
}