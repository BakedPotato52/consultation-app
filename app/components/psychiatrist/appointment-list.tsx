'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { DashboardSkeleton } from "./dashboard-skeleton"
import { useState, useEffect } from "react"
import { toast } from "sonner"


export function AppointmentList() {

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

    if (isLoading) {
        return (<DashboardSkeleton />)
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {upcomingAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell>{appointment.patient.name}</TableCell>
                        <TableCell>{format(new Date(appointment.startTime), "PP")}</TableCell>
                        <TableCell>
                            {format(new Date(appointment.startTime), "p")} - {format(new Date(appointment.endTime), "p")}
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    appointment.status === "COMPLETED"
                                        ? "secondary"
                                        : appointment.status === "CANCELLED"
                                            ? "destructive"
                                            : "default"
                                }
                            >
                                {appointment.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

