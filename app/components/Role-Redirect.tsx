"use client"

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { UserRole } from "@prisma/client"

export function RoleRedirect() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const hasNavigated = useRef(false) // Prevent multiple redirects

    useEffect(() => {
        if (status === "loading" || hasNavigated.current) return

        if (!session) {
            hasNavigated.current = true
            router.replace("/login")
            return
        }

        const role = session?.user?.role as UserRole
        const redirectPath = role === UserRole.PATIENT
            ? "/patient"
            : role === UserRole.PSYCHIATRIST
                ? "/psychiatrist"
                : role === UserRole.ADMIN
                    ? "/admin"
                    : "/login"

        hasNavigated.current = true
        router.replace(redirectPath)
    }, [session, status, router])

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
            </div>
        )
    }

    return null
}
