interface Appointment {
    id: string
    startTime: Date
    endTime: Date
    cost: number
    patient: Patient
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
}

interface Patient {
    name: string;
}