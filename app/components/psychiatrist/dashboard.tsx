"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, BarChart2 } from "lucide-react"
import { AppointmentList } from "./appointment-list"
import { toast } from "sonner"
import { DashboardSkeleton } from "./dashboard-skeleton"


export function PsychiatristDashboard() {
    const { data: session } = useSession()
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("/api/psychiatrist/appointments")
                if (!response.ok) {
                    throw new Error("Failed to fetch appointment data")
                }
                const data = await response.json()
                console.log(data)
                setUpcomingAppointments(data.psychiatristConsultations)
            } catch (error) {
                console.error("Error fetching appointment data:", error)
                toast.error("Failed to load Appointments")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppointments()
    }, [])

    const newAppointments = upcomingAppointments.filter(appointment => {
        const appointmentDate = new Date(appointment.startTime);
        const currentDate = new Date();
        return appointmentDate.getMonth() === currentDate.getMonth() && appointmentDate.getFullYear() === currentDate.getFullYear();
    }).length;

    if (isLoading) {
        return (<DashboardSkeleton />)
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
                        <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">+{newAppointments} new this month</p>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">Next: {upcomingAppointments[0]?.patient.name}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Consultations</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
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
                    <AppointmentList />
                </CardContent>
            </Card>
        </div>
    )
}

