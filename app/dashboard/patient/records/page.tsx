import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MedicalRecordsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your medical records will be displayed here.</p>
                    {/* Add components for displaying medical records */}
                </CardContent>
            </Card>
        </div>
    )
}

