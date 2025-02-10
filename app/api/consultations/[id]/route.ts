import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { db } from "../../../lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const consultation = await db.consultation.findUnique({
            where: { id },
            include: {
                patient: { select: { id: true, name: true } },
                psychiatrist: { select: { id: true, name: true } },
            },
        })

        if (!consultation) {
            return NextResponse.json({ error: "Consultation not found" }, { status: 404 })
        }

        // Check if the user is authorized to view this consultation
        if (session.user.id !== consultation.patientId && session.user.id !== consultation.psychiatristId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        return NextResponse.json(consultation)
    } catch (error) {
        console.error("Error fetching consultation:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

