interface Appointment {
    id: string
    startTime: Date
    endTime: Date
    patientName: string
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
}