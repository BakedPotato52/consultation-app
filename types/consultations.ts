import { ConsultationStatus, UserRole, UserStatus } from "@prisma/client";

export interface Consultation {
    id: string
    patientId: string
    psychiatristId: string
    startTime: Date
    endTime: Date
    cost: number
    status: ConsultationStatus
    notes?: string | null
    cancellationReason?: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
    createdBy?: string | null
    updatedBy?: string | null
    deletedBy?: string | null
    patient: User
    psychiatrist: User
    createdByUser?: User | null
    updatedByUser?: User | null
    deletedByUser?: User | null
}

export interface User {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | null
    image?: string | null
    password?: string | null
    role: UserRole
    status: UserStatus
    bio?: string | null
    phoneNumber?: string | null
    cost?: number | null
    emailNotifications: boolean
    smsNotifications: boolean
    lastLoginAt?: Date | null
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
    createdBy?: string | null
    updatedBy?: string | null
    deletedBy?: string | null
}

export interface ApiConsultation {
    id: string
    startTime: string
    endTime: string
    cost: number
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
    patientId: string
    psychiatristId: string
    psychiatrist: {
        name: string
    }
}

