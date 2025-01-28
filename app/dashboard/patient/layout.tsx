import Navbar from "@/app/components/Navbar"
import { PatientSidebar } from "../../components/patient/sidebar"
import { Suspense } from "react"

export default function PatientDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex bg-background select-none ">
            {/* Sidebar */}

            <Suspense fallback={<div className="animate-pulse h-64 bg-gray-200 rounded-md"></div>}>
                <PatientSidebar />
            </Suspense>
            <main className="w-full max-sm:w-full bg-background overflow-scroll-y flex flex-col">
                <Navbar />
                <div className="flex-1 p-4 sm:p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

