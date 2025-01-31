import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"



interface AppointmentListProps {
    appointments: Appointment[]
}

export function AppointmentList({ appointments }: AppointmentListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{format(appointment.startTime, "PP")}</TableCell>
                        <TableCell>
                            {format(appointment.startTime, "p")} - {format(appointment.endTime, "p")}
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    appointment.status === "COMPLETED"
                                        ? "secondary"
                                        : appointment.status === "CANCELLED"
                                            ? "destructive"
                                            : "default"
                                }
                            >
                                {appointment.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

