'use client'
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock } from "lucide-react"
import { ConsultationList } from "../../components/patient/consultation-list"
import { format } from "date-fns"
import type { Session } from "next-auth"

interface Consultation {
    id: string
    startTime: string
    endTime: string
    cost: number
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
    psychiatrist: {
        name: string
    }
}

interface PatientDashboardProps {
    session: Session
}

export function PatientDashboard({ session }: PatientDashboardProps) {
    const [upcomingConsultations, setUpcomingConsultations] = useState<Consultation[]>([])
    const [pastConsultations, setPastConsultations] = useState<Consultation[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await fetch("/api/consultations")
                if (!response.ok) {
                    throw new Error("Failed to fetch consultations")
                }
                const data = await response.json()
                setUpcomingConsultations(data.upcoming)
                setPastConsultations(data.past)
            } catch (error) {
                console.error("Error fetching consultations:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConsultations()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }


    const nextConsultation = upcomingConsultations[0]

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.name}</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={session?.user?.name || ""} />
                                <AvatarFallback>
                                    {session?.user?.name
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("") || ""}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xl font-semibold">{session?.user?.name}</p>
                                <p className="text-gray-500">{session?.user?.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {nextConsultation && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Next Consultation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold mb-2">{format(nextConsultation.startTime, "PPP")}</p>
                            <p className="text-gray-500 mb-4">
                                <Clock className="inline mr-2" />
                                {format(nextConsultation.startTime, "p")} - {format(nextConsultation.endTime, "p")}
                            </p>
                            <p className="mb-4">With Dr. {nextConsultation.psychiatrist.name}</p>
                            <Button>
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Join Consultation
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Consultations</CardTitle>
                        <CardDescription>Your scheduled appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ConsultationList consultations={upcomingConsultations} />
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Past Consultations</CardTitle>
                        <CardDescription>Your consultation history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ConsultationList consultations={pastConsultations} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

