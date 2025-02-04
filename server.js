import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const hostname = "172.18.144.1"
const port = 4000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server)

  io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).emit("user-connected", userId)

      socket.on("disconnect", () => {
        socket.to(roomId).emit("user-disconnected", userId)
      })
    })
  })

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})

