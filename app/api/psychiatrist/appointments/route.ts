import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth"
import { db } from "@/app/lib/db"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            console.error("No session found")
            return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 })
        }

        if (!session.user || !session.user.role) {
            console.error("Invalid session structure:", JSON.stringify(session, null, 2))
            return NextResponse.json({ error: "Unauthorized - Invalid session structure" }, { status: 401 })
        }



        if (!session.user.id) {
            console.error("No user ID in session")
            return NextResponse.json({ error: "Unauthorized - No user ID" }, { status: 401 })
        }

        const psychiatrist = await db.user.findUnique({
            where: { id: session.user.id },
            select: {
                psychiatristConsultations: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        status: true,
                        cost: true,
                        patient: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })
        if (!psychiatrist) {
            console.error(`Psychiatrist not found for ID: ${session.user.id}`)
            return NextResponse.json({ error: "Psychiatrist not found" }, { status: 404 })
        }

        return NextResponse.json(psychiatrist)
    } catch (error) {
        console.error("Error in GET /api/psychiatrist/appointments:", error)
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}