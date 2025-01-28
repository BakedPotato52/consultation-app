export interface Consultation {
    id: string
    startTime: Date
    endTime: Date
    cost: number
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
    patientId: string
    psychiatristId: string
    psychiatrist: {
        name: string
    }
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

