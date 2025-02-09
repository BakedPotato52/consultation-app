import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { db } from "../../../lib/db"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    try {
        const consultation = await db.consultation.findUnique({
            where: { id: id as string },
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

