import { PatientSidebar } from "../../components/patient/sidebar"

export default function PatientDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <PatientSidebar />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
    )
}

