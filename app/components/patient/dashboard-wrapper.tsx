"use client"

import { useSession } from "next-auth/react"
import { PatientDashboard } from "./pdashboard"

export function PatientDashboardWrapper() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return <div>Access Denied</div>
    }

    if (!session) {
        return <div>Access Denied</div>
    }

    return <PatientDashboard session={session} />
}

