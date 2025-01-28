"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, User, Mail, Phone, MapPin, FileText, Shield } from "lucide-react"

export function ProfileContent() {
    const { data: session } = useSession()
    const [isEditing, setIsEditing] = useState(false)

    // Mock data - in a real app, this would come from your API
    const [profileData, setProfileData] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "(555) 123-4567",
        address: "123 Main St, Anytown, AN 12345",
        dateOfBirth: "1990-01-01",
        emergencyContact: "Jane Doe - (555) 987-6543",
        medicalHistory: "No significant medical history.",
        currentMedications: "None",
        allergies: "None known",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the updated data to your API
        console.log("Updated profile data:", profileData)
        setIsEditing(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your basic information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profileData.name} />
                                <AvatarFallback>
                                    {profileData.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xl font-semibold">{profileData.name}</p>
                                <p className="text-gray-500">{profileData.email}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={profileData.dateOfBirth}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            {isEditing && <Button type="submit">Save Changes</Button>}
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Medical Information</CardTitle>
                        <CardDescription>Your health details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="history" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="history">History</TabsTrigger>
                                <TabsTrigger value="medications">Medications</TabsTrigger>
                                <TabsTrigger value="allergies">Allergies</TabsTrigger>
                            </TabsList>
                            <TabsContent value="history" className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="medicalHistory">Medical History</Label>
                                    <Textarea
                                        id="medicalHistory"
                                        name="medicalHistory"
                                        value={profileData.medicalHistory}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="medications" className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="currentMedications">Current Medications</Label>
                                    <Textarea
                                        id="currentMedications"
                                        name="currentMedications"
                                        value={profileData.currentMedications}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="allergies" className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="allergies">Known Allergies</Label>
                                    <Textarea
                                        id="allergies"
                                        name="allergies"
                                        value={profileData.allergies}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Who to contact in case of emergency</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                            id="emergencyContact"
                            name="emergencyContact"
                            value={profileData.emergencyContact}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-gray-500" />
                            <span>Two-factor authentication</span>
                        </div>
                        <Button variant="outline">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-gray-500" />
                            <span>Download your data</span>
                        </div>
                        <Button variant="outline">Download</Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" className="w-full">
                        Delete Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

