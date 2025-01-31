import type { Metadata } from "next"
import { AuthGuard } from "@/components/auth-guard"
import { PsychiatristDashboard } from "@/app/components/psychiatrists/dashboard"

export const metadata: Metadata = {
  title: "Patient Dashboard",
  description: "View your health information and upcoming appointments",
}

export default function PatientDashboardPage() {
  return (
    <AuthGuard>
      <PsychiatristDashboard />
    </AuthGuard>
  )
}

