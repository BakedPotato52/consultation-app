"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function RoleRedirect() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return

        if (!session) {
            router.push("/login")
            return
        }

        const role = session.user?.role

        switch (role) {
            case "PATIENT":
                router.push("/dashboard/patient")
                break
            case "PSYCHIATRIST":
                router.push("/dashboard/psychiatrist")
                break
            default:
                router.push("/login")
        }
    }, [session, status, router])

    if (status === "loading") {
        return <div>Loading...</div>
    }

    return null
}

