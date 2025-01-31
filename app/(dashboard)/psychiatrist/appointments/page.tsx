import { AppointmentList } from "@/app/components/psychiatrist/appointment-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Appointments",
    description: "Manage your appointments",
}

const appointments: Appointment[] = [
    {
        id: "1",
        startTime: new Date("2021-09-01T09:00:00Z"),
        endTime: new Date("2021-09-01T09:30:00Z"),
        patientName: "Alice",
        status: "COMPLETED",
    },
    {
        id: "2",
        startTime: new Date("2021-09-01T10:00:00Z"),
        endTime: new Date("2021-09-01T10:30:00Z"),
        patientName: "Bob",
        status: "SCHEDULED",
    },
    {
        id: "3",
        startTime: new Date("2021-09-01T11:00:00Z"),
        endTime: new Date("2021-09-01T11:30:00Z"),
        patientName: "Charlie",
        status: "CANCELLED",
    },
]; // Define the appointments array

export default function AppointmentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <AppointmentList appointments={appointments} />
        </div>
    )
}

