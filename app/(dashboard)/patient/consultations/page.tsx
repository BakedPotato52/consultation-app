"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Psychiatrist {
    id: string
    name: string
    cost: number
}

const mockPsychiatrists: Psychiatrist[] = [
    { id: "1", name: "Dr. Smith", cost: 100 },
    { id: "2", name: "Dr. Johnson", cost: 120 },
    { id: "3", name: "Dr. Williams", cost: 110 },
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
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Authentication Required</CardTitle>
                        <CardDescription>Please sign in to schedule a consultation.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="w-full" onClick={() => router.push("/login")}>
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Schedule a Consultation</CardTitle>
                    <CardDescription>Choose a psychiatrist and select a time for your consultation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                            {psychiatrist.name} - ${psychiatrist.cost}/hour
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Select a Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !selectedDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                                </PopoverContent>
                            </Popover>
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
                        Schedule and Pay ${selectedPsychiatrist?.cost || 0}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

