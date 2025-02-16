"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Psychiatrist {
    id: string
    name: string
    rate: number
}

const mockPsychiatrists: Psychiatrist[] = [
    { id: "1", name: "Dr. Smith", rate: 100 },
    { id: "2", name: "Dr. Johnson", rate: 120 },
    { id: "3", name: "Dr. Williams", rate: 110 },
]

export default function Consultations() {
    const [selectedPsychiatrist, setSelectedPsychiatrist] = useState<Psychiatrist | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")

    const router = useRouter()
    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedPsychiatrist || !selectedDate || !selectedTime) {
            toast.error("Please fill in all required fields")
            return
        }

        try {
            // Here you would typically make an API call to create the consultation
            // and process the payment. For this example, we'll simulate a successful creation.
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

            toast.success("Consultation scheduled successfully!")
            router.push("/dashboard") // Redirect to dashboard or confirmation page
        } catch (error) {
            toast.error("Failed to schedule consultation. Please try again.")
        }
    }

    if (!session) {
        return <div>Please sign in to schedule a consultation.</div>
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Schedule a Consultation</CardTitle>
                    <CardDescription>Choose a psychiatrist and select a time for your consultation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="psychiatrist">Select a Psychiatrist</Label>
                            <Select
                                onValueChange={(value) =>
                                    setSelectedPsychiatrist(mockPsychiatrists.find((p) => p.id === value) || null)
                                }
                            >
                                <SelectTrigger id="psychiatrist">
                                    <SelectValue placeholder="Select a psychiatrist" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockPsychiatrists.map((psychiatrist) => (
                                        <SelectItem key={psychiatrist.id} value={psychiatrist.id}>
                                            {psychiatrist.name} - ${psychiatrist.rate}/hour
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Select a Date</Label>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Select a Time</Label>
                            <Select onValueChange={setSelectedTime}>
                                <SelectTrigger id="time">
                                    <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" onClick={handleSubmit}>
                        Schedule and Pay ${selectedPsychiatrist?.rate || 0}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

