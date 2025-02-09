"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useZegoCloud } from "@/hooks/useZegoCloud"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ConsultationContent({ consultationId }: { consultationId: string }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [isLoading, setIsLoading] = useState(true)
    const [consultation, setConsultation] = useState<any>(null)
    const videoContainerRef = useRef<HTMLDivElement>(null)

    const { joinRoom } = useZegoCloud(consultationId, session?.user?.id as string, session?.user?.name as string)

    useEffect(() => {
        const fetchConsultation = async () => {
            if (consultationId && session?.user?.id) {
                try {
                    const response = await fetch(`/api/consultations/${consultationId}`)
                    if (response.ok) {
                        const data = await response.json()
                        setConsultation(data)
                    } else {
                        console.error("Failed to fetch consultation")
                    }
                } catch (error) {
                    console.error("Error fetching consultation:", error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchConsultation()
    }, [consultationId, session?.user?.id])

    useEffect(() => {
        if (videoContainerRef.current && consultation) {
            joinRoom(videoContainerRef.current)
        }
    }, [consultation, joinRoom])

    if (status === "loading" || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
            </div>
        )
    }

    if (!session) {
        router.push("/login")
        return null
    }

    if (!consultation) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle>Consultation Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>The requested consultation could not be found.</p>
                        <Button onClick={() => router.push("/")} className="mt-4">
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">

            <div ref={videoContainerRef} className="w-full h-svh" />
            {session.user.role === "PSYCHIATRIST" && (
                <div className="mt-4">
                    <Button onClick={() => router.push(`/notes/${consultationId}`)}>Add Consultation Notes</Button>
                </div>
            )}
        </div>
    )
}

