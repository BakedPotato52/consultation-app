"use client"

import { useSession } from "next-auth/react"
import { PatientDashboard } from "./pdashboard"
import { Loader2 } from "lucide-react"

export function PatientDashboardWrapper() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
            </div>
        )
    }

    if (status === "unauthenticated") {
        return <div>Access Denied</div>
    }

    if (!session) {
        return <div>Access Denied</div>
    }

    return <PatientDashboard session={session} />
}

