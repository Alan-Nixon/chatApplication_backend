import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import 'dotenv/config'
import './database/database'
import cors from 'cors'
import logger from 'morgan'
import userRoutes from './routes/userRoutes'
import { socketCode } from './socket';


const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
    cors: { origin: process.env.CHAT_URL }
});

app.use(logger("dev"))
app.use(express.json())
// app.use(express.urlencoded())

app.use(cors({
    origin: process.env.CHAT_URL
}))

socketCode(io)

app.use("/", userRoutes)


const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:4000`)
});
