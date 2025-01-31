import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Appointments",
    description: "Manage your appointments",
}

export default function AppointmentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p>Appointment management functionality will be implemented here.</p>
        </div>
    )
}

