import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { db } from "../../../lib/db"

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await req.json()

        const updatedUser = await db.user.update({
            where: { id: session.user.id },
            data: {
                name: data.name,
                email: data.email,
                bio: data.bio,
                phoneNumber: data.phoneNumber,
                emailNotifications: data.emailNotifications,
                smsNotifications: data.smsNotifications,
            },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error("Error updating user settings:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

