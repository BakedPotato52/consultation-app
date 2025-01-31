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

        if (session.user.role !== "PSYCHIATRIST") {
            console.error(`Unauthorized role: ${session.user.role}`)
            return NextResponse.json({ error: "Unauthorized - Invalid role" }, { status: 401 })
        }

        if (!session.user.id) {
            console.error("No user ID in session")
            return NextResponse.json({ error: "Unauthorized - No user ID" }, { status: 401 })
        }

        const psychiatrist = await db.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                image: true,
                phoneNumber: true,
                smsNotifications: true,
                emailNotifications: true,
                emailVerified: true,
            },
        })

        if (!psychiatrist) {
            console.error(`Psychiatrist not found for ID: ${session.user.id}`)
            return NextResponse.json({ error: "Psychiatrist not found" }, { status: 404 })
        }

        return NextResponse.json(psychiatrist)
    } catch (error) {
        console.error("Error in GET /api/psychiatrist/profile:", error)
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        console.log("Session:", JSON.stringify(session, null, 2))

        if (!session || !session.user || session.user.role !== "PSYCHIATRIST") {
            console.error("Unauthorized access attempt:", JSON.stringify(session, null, 2))
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await req.json()

        const updatedPsychiatrist = await db.user.update({
            where: { id: session.user.id },
            data: {
                name: data.name,
                bio: data.bio,
                phoneNumber: data.phoneNumber,
                smsNotifications: data.smsNotifications,
                emailNotifications: data.emailNotifications,
            },
        })

        return NextResponse.json(updatedPsychiatrist)
    } catch (error) {
        console.error("Error in PUT /api/psychiatrist/profile:", error)
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}

