"use client"

import { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

export default function VideoCall({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<any>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  const peerVideo = useRef<HTMLVideoElement>(null)
  const peerConnection = useRef<RTCPeerConnection | null>(null)

  useEffect(() => {
    const newSocket = io()
    setSocket(newSocket)

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream
      }

      peerConnection.current = new RTCPeerConnection()

      stream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, stream)
      })

      peerConnection.current.ontrack = (event) => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = event.streams[0]
        }
      }

      newSocket.emit("join-room", roomId, newSocket.id)

      newSocket.on("user-connected", (userId: string) => {
        const call = () => {
          peerConnection.current
            ?.createOffer()
            .then((offer) => peerConnection.current?.setLocalDescription(offer))
            .then(() => {
              newSocket.emit("offer", peerConnection.current?.localDescription, roomId)
            })
        }

        call()
      })

      newSocket.on("offer", (offer: RTCSessionDescriptionInit) => {
        peerConnection.current
          ?.setRemoteDescription(new RTCSessionDescription(offer))
          .then(() => peerConnection.current?.createAnswer())
          .then((answer) => peerConnection.current?.setLocalDescription(answer))
          .then(() => {
            newSocket.emit("answer", peerConnection.current?.localDescription, roomId)
          })
      })

      newSocket.on("answer", (answer: RTCSessionDescriptionInit) => {
        peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer))
      })
    })

    return () => {
      newSocket.disconnect()
    }
  }, [roomId])

  return (
    <div className="flex justify-around">
      <video ref={userVideo} autoPlay muted playsInline className="w-1/2" />
      <video ref={peerVideo} autoPlay playsInline className="w-1/2" />
    </div>
  )
}

