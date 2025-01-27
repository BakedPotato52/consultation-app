import { db } from "./db"
import type { Consultation as PrismaConsultation } from "@prisma/client"

type Consultation = Omit<PrismaConsultation, "psychiatrist"> & {
    psychiatrist: {
        name: string
    }
}

export async function getConsultations(patientId: string | undefined): Promise<{
    upcoming: Consultation[]
    past: Consultation[]
}> {
    if (!patientId) {
        return { upcoming: [], past: [] }
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

    return {
        upcoming: upcomingConsultations,
        past: pastConsultations,
    }
}
