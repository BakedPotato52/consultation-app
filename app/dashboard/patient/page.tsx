import type { Metadata } from "next"
import { PatientDashboard } from "../../components/patient/pdashboard"

export const metadata: Metadata = {
    title: "Patient Dashboard",
    description: "View your health information and upcoming appointments",
}

export default function PatientDashboardPage() {
    return <PatientDashboard />
}

