"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { Consultation } from "@/types/consultations"
import { ConsultationStatus } from "@prisma/client"

interface ConsultationListProps {
    consultations: Consultation[]
}

export function ConsultationList({ consultations }: ConsultationListProps) {
    const getStatusVariant = (status: ConsultationStatus) => {
        switch (status) {
            case ConsultationStatus.COMPLETED:
                return "secondary"
            case ConsultationStatus.CANCELLED:
                return "destructive"
            case ConsultationStatus.NO_SHOW:
                return "destructive"
            case ConsultationStatus.IN_PROGRESS:
                return "default"
            default:
                return "default"
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Psychiatrist</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
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
                            <Badge variant={getStatusVariant(consultation.status)}>
                                {consultation.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {consultation.notes || consultation.cancellationReason || "-"}
                        </TableCell>
                        <TableCell className="text-right">${consultation.cost.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

