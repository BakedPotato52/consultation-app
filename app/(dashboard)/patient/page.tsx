import type { Metadata } from "next"
import { PatientDashboardWrapper } from "@/app/components/patient/dashboard-wrapper"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
    title: "Patient Dashboard",
    description: "View your health information and upcoming appointments",
}

export default function PatientDashboardPage() {
    return (
        <AuthGuard>
            <PatientDashboardWrapper />
        </AuthGuard>
    )
}

