"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock } from "lucide-react"
import { ConsultationList } from "./consultation-list"
import { format } from "date-fns"
import type { Session } from "next-auth"
import type { Consultation, ApiConsultation } from "@/types/consultations"
import { toast } from "@/components/ui/use-toast"
import DasboardSk from "./dasboardsk"
import Link from "next/link"

interface PatientDashboardProps {
    session: Session
}

export function PatientDashboard({ session }: PatientDashboardProps) {
    const [upcomingConsultations, setUpcomingConsultations] = useState<Consultation[]>([])
    const [pastConsultations, setPastConsultations] = useState<Consultation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchConsultations = async () => {


            try {
                const response = await fetch(`/api/consultations?patientId=${session.user.id}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()

                if (!data || typeof data !== "object") {
                    throw new Error("Invalid data received from server")
                }

                // Convert API response dates to Date objects
                const convertConsultation = (consultation: ApiConsultation): Consultation => ({
                    ...consultation,
                    startTime: new Date(consultation.startTime),
                    endTime: new Date(consultation.endTime),
                })

                setUpcomingConsultations(Array.isArray(data.upcoming) ? data.upcoming.map(convertConsultation) : [])
                setPastConsultations(Array.isArray(data.past) ? data.past.map(convertConsultation) : [])
                setError(null)
            } catch (error) {
                console.error("Error fetching consultations:", error)
                setError("Failed to fetch consultations. Please try again later.")
                toast({
                    title: "Error",
                    description: "Failed to fetch consultations. Please try again later.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchConsultations()
    }, [session])

    if (isLoading) {
        return <DasboardSk />
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
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
                                <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name || ""} />
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
                            <Link href={`/consultation/${nextConsultation.id}`} passHref className="flex flex-row bg-linear-to-t from-sky-500 to-indigo-500 text-white px-4 py-2 rounded-md ease-in-out transition duration-150 hover:from-sky-600 hover:to-indigo-600">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Join Consultation
                            </Link>
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

