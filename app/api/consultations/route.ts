import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { db } from "../../lib/db"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const patientId = session.user.id

        const now = new Date()

        const upcomingConsultations = await db.consultation.findMany({
            where: {
                patientId: patientId,
                startTime: { gte: now },
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
    } catch (error) {
        console.error("Error in consultations API:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
