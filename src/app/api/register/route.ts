import { db } from "../../lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json()

        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        })

        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
        }

        const user = await db.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        })

        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

