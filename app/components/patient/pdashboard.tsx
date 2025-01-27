"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, MessageCircle, Phone, PlusCircle } from "lucide-react"

export function PatientDashboard() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Mock data - in a real app, this would come from an API
    const patientInfo = {
        name: "John Doe",
        age: 35,
        nextAppointment: "2023-06-15T10:00:00",
        recentRecords: [
            { id: 1, type: "Blood Test", date: "2023-05-20" },
            { id: 2, type: "X-Ray", date: "2023-05-15" },
        ],
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, {patientInfo.name}</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={patientInfo.name} />
                                <AvatarFallback>
                                    {patientInfo.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xl font-semibold">{patientInfo.name}</p>
                                <p className="text-gray-500">Age: {patientInfo.age}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Appointment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold mb-2">{new Date(patientInfo.nextAppointment).toLocaleString()}</p>
                        <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Reschedule
                            </Button>
                            <Button size="sm" variant="outline">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Message
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Medical Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {patientInfo.recentRecords.map((record) => (
                                <li key={record.id} className="flex justify-between items-center">
                                    <span>{record.type}</span>
                                    <Badge variant="secondary">{record.date}</Badge>
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full mt-4" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            View All Records
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                New Appointment
                            </Button>
                            <Button variant="outline">
                                <Phone className="mr-2 h-4 w-4" />
                                Contact Doctor
                            </Button>
                            <Button variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                Request Prescription
                            </Button>
                            <Button variant="outline">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Appointment Calendar</CardTitle>
                        <CardDescription>Schedule and view your appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

