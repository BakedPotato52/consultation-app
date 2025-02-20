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
            where: { id: session.user.id && session.user.role === "PSYCHIATRIST" ? session.user.id : undefined },
            select: {
                id: true,
                name: true,
                cost: true,

            },
        })
        if (!psychiatrist) {
            console.error(`Psychiatrist not found for ID: ${session.user.id}`)
            return NextResponse.json({ error: "Psychiatrist not found" }, { status: 404 })
        }

        return NextResponse.json(psychiatrist)
    } catch (error) {
        console.error("Error in GET /api/psychiatrist/consultations/createConsultation:", error)
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}

export async function POST(req: Request) {
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

        if (session.user.role !== "PSYCHIATRIST") {
            console.error("User is not a psychiatrist")
            return NextResponse.json({ error: "Unauthorized - User is not a psychiatrist" }, { status: 403 })
        }

        const body = await req.json()
        const { name, cost, date, time, endTime, patientId } = body

        if (!name || !cost || !date || !time || !endTime || !patientId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const consultation = await db.consultation.create({
            data: {
                psychiatristId: session.user.id,
                patientId,
                cost,
                createdAt: date,
                startTime: time,
                endTime: endTime,
                status: "SCHEDULED",
            },
        })

        return NextResponse.json(consultation)
    } catch (error) {
        console.error("Error in POST /api/psychiatrist/consultations/createConsultation:", error)
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}