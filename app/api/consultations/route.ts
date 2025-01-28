import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { db } from "../../lib/db"

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")

    if (!patientId) {
        return NextResponse.json({ error: "Patient ID is required" }, { status: 400 })
    }

    const now = new Date()

    const upcomingConsultations = await db.consultation.findMany({
        where: {
            patientId: patientId,
            startTime: { gte: now },
            status: "SCHEDULED",
        },
        include: {
            psychiatrist: {
                select: { name: true },
            },
        },
        orderBy: { startTime: "asc" },
    })

    const pastConsultations = await db.consultation.findMany({
        where: {
            patientId: patientId,
            startTime: { lt: now },
        },
        include: {
            psychiatrist: {
                select: { name: true },
            },
        },
        orderBy: { startTime: "desc" },
    })

    return NextResponse.json({
        upcoming: upcomingConsultations,
        past: pastConsultations,
    })
}

