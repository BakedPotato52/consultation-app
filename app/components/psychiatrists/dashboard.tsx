"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, BarChart2 } from "lucide-react"
import { AppointmentList } from "./appointment-list"

interface Appointment {
    id: string
    startTime: Date
    endTime: Date
    patientName: string
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
}

export function PsychiatristDashboard() {
    const { data: session } = useSession()
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAppointments = async () => {
            // In a real application, this would be an API call
            setUpcomingAppointments([
                {
                    id: "1",
                    startTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
                    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
                    patientName: "John Doe",
                    status: "SCHEDULED",
                },
                {
                    id: "2",
                    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
                    endTime: new Date(Date.now() + 1000 * 60 * 60 * 25), // 1 day and 1 hour from now
                    patientName: "Jane Smith",
                    status: "SCHEDULED",
                },
            ])
            setIsLoading(false)
        }

        fetchAppointments()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome, Dr. {session?.user?.name}</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">250</div>
                        <p className="text-xs text-muted-foreground">+5 new this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">Next: {upcomingAppointments[0]?.patientName}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Consultations</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-muted-foreground">12% increase from last month</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled appointments for today and tomorrow</CardDescription>
                </CardHeader>
                <CardContent>
                    <AppointmentList appointments={upcomingAppointments} />
                </CardContent>
            </Card>
        </div>
    )
}

