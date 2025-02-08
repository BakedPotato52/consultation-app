// pages/consultation/[id].tsx
'use server'
import React from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import useZegoCloudVideoCall from '../../../../hooks/useZegoCall';

interface User {
    id: string;
    name: string;
    role: 'patient' | 'psychiatrist';
}

// Dummy user data. Replace this with your authentication logic.
const currentUser: User = {
    id: 'user123',
    name: 'John Doe',
    role: 'patient', // Change to 'psychiatrist' to test psychiatrist controls.
};

const ConsultationPage: NextPage = () => {
    const router = useRouter();
    const { id: consultationId } = router.query;

    // Ensure we have a valid consultation room ID.
    if (!consultationId || typeof consultationId !== 'string') {
        return <p>Loading...</p>;
    }

    // Use our custom hook to initialize the video call.
    const { videoCallContainerRef, startCall, endCall } = useZegoCloudVideoCall({
        roomID: consultationId,
        userID: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
    });

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Consultation Session</h1>

            {/* Render different controls based on the user role */}
            {currentUser.role === 'psychiatrist' ? (
                <div style={{ marginBottom: '1rem' }}>
                    <p>
                        <strong>Psychiatrist Controls:</strong>
                    </p>
                    <button onClick={startCall} style={{ marginRight: '0.5rem' }}>
                        Start Consultation
                    </button>
                    <button onClick={endCall}>End Consultation</button>
                </div>
            ) : (
                <div style={{ marginBottom: '1rem' }}>
                    <p>
                        <strong>Patient View:</strong>
                    </p>
                    <button onClick={endCall}>Leave Consultation</button>
                </div>
            )}

            {/* Container where the ZegoCloud video UI will render */}
            <div
                ref={videoCallContainerRef}
                style={{
                    width: '100%',
                    height: '600px',
                    backgroundColor: '#000',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            />
        </div>
    );
};

export default ConsultationPage;
