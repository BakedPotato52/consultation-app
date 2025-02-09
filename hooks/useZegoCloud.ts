"use client"

import { useState, useEffect, useCallback } from "react"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

export const useZegoCloud = (roomId: string, userId: string, userName: string) => {
    const [zp, setZp] = useState<ZegoUIKitPrebuilt | null>(null)

    const initializeZegoCloud = useCallback(async () => {
        const appID = Number.parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID || "0", 10)
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || ""

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userId, userName)

        const zp = ZegoUIKitPrebuilt.create(kitToken)
        setZp(zp)

        return zp
    }, [roomId, userId, userName])

    useEffect(() => {
        initializeZegoCloud()
    }, [initializeZegoCloud])

    const joinRoom = useCallback(
        (element: HTMLDivElement) => {
            if (zp) {
                zp.joinRoom({
                    container: element,
                    sharedLinks: [
                        {
                            name: "Personal link",
                            url: window.location.href,
                        },
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.OneONoneCall,
                    },
                })
            }
        },
        [zp],
    )

    return { joinRoom }
}

