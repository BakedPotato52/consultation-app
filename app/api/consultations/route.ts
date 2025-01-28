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

        const { searchParams } = new URL(req.url)
        const patientId = searchParams.get("patientId")

        if (!patientId) {
            return NextResponse.json({ error: "Patient ID is required" }, { status: 400 })
        }

        // Ensure the requesting user can only access their own consultations
        if (patientId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
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

        // Ensure we're returning an object, even if the arrays are empty
        return NextResponse.json({
            upcoming: upcomingConsultations || [],
            past: pastConsultations || [],
        })
    } catch (error) {
        console.error("Error in consultations API:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
