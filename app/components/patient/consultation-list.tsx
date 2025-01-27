import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Consultation {
    id: string
    startTime: string
    endTime: string
    cost: number
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
    psychiatrist: {
        name: string
    }
}

interface ConsultationListProps {
    consultations: Consultation[]
}

export function ConsultationList({ consultations }: ConsultationListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Psychiatrist</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {consultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                        <TableCell>{format(new Date(consultation.startTime), "PP")}</TableCell>
                        <TableCell>
                            {format(new Date(consultation.startTime), "p")} - {format(new Date(consultation.endTime), "p")}
                        </TableCell>
                        <TableCell>Dr. {consultation.psychiatrist.name}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    consultation.status === "COMPLETED"
                                        ? "success"
                                        : consultation.status === "CANCELLED"
                                            ? "destructive"
                                            : "default"
                                }
                            >
                                {consultation.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">${consultation.cost.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

