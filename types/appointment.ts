interface Appointment {
    id: string
    startTime: Date
    endTime: Date
    cost: number
    patientName: string
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
}
