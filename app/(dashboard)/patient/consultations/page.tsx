import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsultationList } from '../../../components/patient/consultation-list'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { notFound } from "next/navigation"
import { Suspense } from "react"

async function getConsultations() {
    const session = await getServerSession(authOptions)

    if (!session) {
        notFound()
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/consultations`, {
        headers: {
            Cookie: `next-auth.session-token=${session.user.id}`,
        },
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to fetch consultations: ${res.status} ${res.statusText}\n${errorText}`)
    }

    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text()
        throw new Error(`Expected JSON, got ${contentType}:\n${text}`)
    }

    return res.json()
}

function ConsultationsLoading() {
    return <div>Loading consultations...</div>
}

function ConsultationsError({ error }: { error: Error }) {
    return (
        <div className="text-red-500">
            <h2>Error loading consultations:</h2>
            <pre>{error.message}</pre>
        </div>
    )
}

async function ConsultationsContent() {
    try {
        const { upcoming, past } = await getConsultations()

        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ConsultationList consultations={upcoming} />
                    </CardContent>
                </Card>
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Past Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ConsultationList consultations={past} />
                    </CardContent>
                </Card>
            </>
        )
    } catch (error) {
        return <ConsultationsError error={error instanceof Error ? error : new Error("An unknown error occurred")} />
    }
}

export default function ConsultationsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Consultations</h1>
            <Suspense fallback={<ConsultationsLoading />}>
                <ConsultationsContent />
            </Suspense>
        </div>
    )
}
