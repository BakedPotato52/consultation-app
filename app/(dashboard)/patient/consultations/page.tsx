import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsultationList } from '../../../components/patient/consultation-list'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
    return (
        <div className="container mx-auto p-6">
            <Skeleton className="h-10 w-1/3 mb-6" />

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-1/2" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-20 w-20 rounded-full" />
                            <div>
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-2/3" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-40 mb-4" />
                        <Skeleton className="h-4 w-56 mb-4" />
                        <Skeleton className="h-10 w-40" />
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-1/3" /></CardTitle>
                        <Skeleton className="h-4 w-40" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-1/3" /></CardTitle>
                        <Skeleton className="h-4 w-40" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
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
