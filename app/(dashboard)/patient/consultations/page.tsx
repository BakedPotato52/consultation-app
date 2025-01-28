import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsultationList } from '../../../components/patient/consultation-list'

export default async function ConsultationsPage() {
    // In a real application, you would fetch this data from your API
    const consultations = [
        {
            id: "1",
            startTime: new Date("2023-06-15T10:00:00"),
            endTime: new Date("2023-06-15T11:00:00"),
            cost: 100,
            status: "SCHEDULED",
            psychiatrist: { name: "Dr. Smith" },
        },
        // Add more mock consultations as needed
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Consultations</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                    <ConsultationList consultations={consultations} />
                </CardContent>
            </Card>
        </div>
    )
}

