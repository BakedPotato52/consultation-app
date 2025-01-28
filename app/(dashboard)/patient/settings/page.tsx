import type { Metadata } from "next"
import { PatientSettingsForm } from "../../../components/patient/setting-form"

export const metadata: Metadata = {
    title: "Patient Settings",
    description: "Manage your account settings and preferences",
}

export default function PatientSettingsPage() {
    return (
        <div className="container mx-auto pb-10">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
            <PatientSettingsForm />
        </div>
    )
}

