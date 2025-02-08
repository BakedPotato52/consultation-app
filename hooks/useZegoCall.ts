// hooks/useZegoCloudVideoCall.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import ZegoUIKitPrebuilt from '@zegocloud/zego-uikit-prebuilt';

export interface UseZegoCloudVideoCallProps {
    roomID: string;
    userID: string;
    userName: string;
    role: 'patient' | 'psychiatrist';
}

export interface UseZegoCloudVideoCallReturn {
    videoCallContainerRef: React.RefObject<HTMLDivElement | null>;
    participants: any[]; // Refine this type if you have a specific participant interface.
    startCall: () => void;
    endCall: () => void;
}

const useZegoCloudVideoCall = ({
    roomID,
    userID,
    userName,
    role,
}: UseZegoCloudVideoCallProps): UseZegoCloudVideoCallReturn => {
    // Ref for the container where the video UI will render.
    const videoCallContainerRef = useRef<HTMLDivElement>(null);
    const [zegoInstance, setZegoInstance] = useState<any>(null);
    const [participants, setParticipants] = useState<any[]>([]);

    useEffect(() => {
        if (!videoCallContainerRef.current) return;

        // Ensure your ZegoCloud credentials are available.
        const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET as string;

        // Generate a test kit token.
        // If TypeScript complains about missing types, cast ZegoUIKitPrebuilt to any.
        const kitToken = (ZegoUIKitPrebuilt as any).generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            userID,
            userName
        );

        // Create a ZegoCloud UI kit instance.
        const zego = (ZegoUIKitPrebuilt as any).create(kitToken);

        // Join the room and mount the video UI into our container.
        zego.joinRoom({
            container: videoCallContainerRef.current,
            scenario: {
                mode: (ZegoUIKitPrebuilt as any).VideoConference, // Adjust mode if necessary.
            },
            // Optionally, add callbacks to track participant events.
            // onUserUpdate: (updateType: string, userList: any[]) => {
            //   setParticipants(userList);
            // },
        });

        setZegoInstance(zego);

        // Cleanup when component unmounts.
        return () => {
            if (zego) {
                zego.leaveRoom();
            }
        };
    }, [roomID, userID, userName]);

    // Helper function: With the prebuilt kit, joining the room already starts the call.
    const startCall = useCallback(() => {
        console.log('Call started');
    }, []);

    // End the call by leaving the room.
    const endCall = useCallback(() => {
        if (zegoInstance) {
            zegoInstance.leaveRoom();
            console.log('Call ended');
        }
    }, [zegoInstance]);

    return { videoCallContainerRef, participants, startCall, endCall };
};

export default useZegoCloudVideoCall;
