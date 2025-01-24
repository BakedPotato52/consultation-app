// Code for the server
require("dotenv").config()
const createServer = require("http").createServer
const parse = require("url").parse
const next = require("next")
const { Server } = require("socket.io")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = createServer((req: { url: any }, res: any) => {
        const parsedUrl = parse(req.url!, true)
        handle(req, res, parsedUrl)
    })

    const io = new Server(server)

    io.on("connection", (socket: { on: (event: string, callback: (...args: any[]) => void) => void; join: (room: string) => void; to: (room: string) => { emit: (event: string, ...args: any[]) => void } }) => {
        console.log("A user connected")

        socket.on("join-room", (roomId: any, userId: any) => {
            socket.join(roomId)
            socket.to(roomId).emit("user-connected", userId)

            socket.on("disconnect", () => {
                socket.to(roomId).emit("user-disconnected", userId)
            })
        })
    })

    server.listen(4000, () => {
        console.log("> Ready on http://localhost:4000")
    })
})

