'use client'
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"


export function RecentPatients() {
    const [recentPatients, setRecentPatients] = useState<Appointment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("/api/psychiatrist/appointments")
                if (!response.ok) {
                    throw new Error("Failed to fetch patient data")
                }
                const data = await response.json()

                setRecentPatients(data.psychiatristConsultations)
            } catch (error) {
                console.error("Error fetching patient data:", error)
                toast.error("Failed to load patients")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPatients()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
            </div>
        )
    }
    return (
        <div className="space-y-8">
            {recentPatients.map((patients) => (
                <div key={patients.patient.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={patients.patient.image} alt={patients.patient.name} />
                        <AvatarFallback>
                            {patients.patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{patients.patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patients.patient.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

