"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Consultation {
    id: string
    patientId: string
    psychiatristId: string
    startTime: Date
    endTime: Date
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
                        <TableCell>{format(consultation.startTime, "PP")}</TableCell>
                        <TableCell>
                            {format(consultation.startTime, "p")} - {format(consultation.endTime, "p")}
                        </TableCell>
                        <TableCell>Dr. {consultation.psychiatrist.name}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    consultation.status === "COMPLETED"
                                        ? "secondary"
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

