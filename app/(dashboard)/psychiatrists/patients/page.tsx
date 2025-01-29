import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Patients",
    description: "Manage your patients",
}

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Patients</h1>
            <p>Patient management functionality will be implemented here.</p>
        </div>
    )
}

