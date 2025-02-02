interface Appointment {
    id: string
    startTime: Date
    endTime: Date
    cost: number
    patient: Patient
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
}

interface Patient {
    id: string;
    name: string;
    email: string;
    image: string;

}