"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
}

export default function Consultations() {
    const [selectedPsychiatrist, setSelectedPsychiatrist] = useState<Psychiatrist | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [psychiatrists, setPsychiatrists] = useState<Psychiatrist[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchPsychiatrists = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("/api/psychiatrist/consultations/createConsultation")
                if (!response.ok) {
                    throw new Error("Failed to fetch psychiatrists data")
                }
                const data = await response.json()
                setPsychiatrists(data)
            } catch (error) {
                toast.error("Failed to load psychiatrists. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPsychiatrists()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedPsychiatrist || !selectedDate || !selectedTime) {
            toast.error("Please fill in all required fields")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch("/api/consultations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    psychiatristId: selectedPsychiatrist.id,
                    date: selectedDate,
                    time: selectedTime,
                    cost: selectedPsychiatrist.cost,
                    patientId: session?.user.id,
                }),
            })

            if (!response.ok) throw new Error("Failed to schedule consultation")

            toast.success("Consultation scheduled successfully!")
            router.push(`/${session?.user.role}`)
        } catch (error) {
            toast.error("Failed to schedule consultation. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const memoizedPsychiatristOptions = useMemo(
        () =>
            psychiatrists.map((psychiatrist) => (
                <SelectItem key={psychiatrist.id} value={psychiatrist.id}>
                    {psychiatrist.name} - ${psychiatrist.cost}/hour
                </SelectItem>
            )),
        [psychiatrists],
    )

    if (!session) {
        return (
            <motion.div
                className="flex items-center justify-center h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInUp}
            >
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
            </motion.div>
        )
    }

    return (
        <motion.div
            className="container mx-auto p-4 md:p-8"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
        >
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                        Schedule a Consultation
                    </CardTitle>
                    <CardDescription>Choose a psychiatrist and select a time for your consultation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence>
                            <motion.div className="space-y-2" variants={fadeInUp}>
                                <Label htmlFor="psychiatrist">Select a Psychiatrist</Label>
                                <Select
                                    onValueChange={(value) => setSelectedPsychiatrist(psychiatrists.find((p) => p.id === value) || null)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger id="psychiatrist">
                                        <SelectValue placeholder="Select a psychiatrist" />
                                    </SelectTrigger>
                                    <SelectContent>{memoizedPsychiatristOptions}</SelectContent>
                                </Select>
                            </motion.div>

                            <motion.div className="space-y-2" variants={fadeInUp}>
                                <Label>Select a Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !selectedDate && "text-muted-foreground",
                                            )}
                                            disabled={isLoading}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </motion.div>

                            <motion.div className="space-y-2" variants={fadeInUp}>
                                <Label htmlFor="time">Select a Time</Label>
                                <Select onValueChange={setSelectedTime} disabled={isLoading}>
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
                            </motion.div>

                            <motion.div className="space-y-2" variants={fadeInUp}>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </motion.div>

                            <motion.div className="grid grid-cols-2 gap-4" variants={fadeInUp}>
                                <div className="space-y-2">
                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                    <Input
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input
                                        id="cvv"
                                        placeholder="123"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Scheduling..." : `Schedule and Pay $${selectedPsychiatrist?.cost || 0}`}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

