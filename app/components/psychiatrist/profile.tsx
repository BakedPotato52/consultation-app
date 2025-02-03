"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { FileText, Loader2, Shield } from "lucide-react"

interface PsychiatristData {
    id: string
    name: string
    email: string
    bio: string
    image: string
    phoneNumber: string
    smsNotifications: boolean
    emailNotifications: boolean
    emailVerified: boolean
}

export function PsychiatristProfile() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState<PsychiatristData | null>(null)

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch("/api/psychiatrist/profile")
                if (!response.ok) {
                    throw new Error("Failed to fetch profile data")
                }
                const data = await response.json()
                setProfileData(data)
            } catch (error) {
                console.error("Error fetching profile data:", error)
                toast.error("Failed to load profile data")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfileData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileData((prev) => (prev ? { ...prev, [name]: value } : null))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setProfileData((prev) => (prev ? { ...prev, [name]: checked } : null))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch("/api/psychiatrist/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData),
            })
            if (!response.ok) {
                throw new Error("Failed to update profile")
            }
            toast.success("Profile updated successfully")
            setIsEditing(false)
        } catch (error) {
            console.error("Error updating profile:", error)
            toast.error("Failed to update profile")
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
            </div>
        )
    }

    if (!profileData) {
        return <div className="text-red-700">Error: Unable to load profile data</div>
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
                        <CardDescription>Manage your personal details and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={profileData.image || "/placeholder.svg?height=80&width=80"} alt={profileData.name} />
                                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xl font-semibold">{profileData.name}</p>
                                <p className="text-sm text-muted-foreground">{profileData.email}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Gmail</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={profileData.phoneNumber}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="bio">Professional Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    rows={4}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="smsNotifications"
                                    checked={profileData.smsNotifications}
                                    onCheckedChange={handleSwitchChange("smsNotifications")}
                                    disabled={!isEditing}
                                />
                                <Label htmlFor="smsNotifications">Receive SMS notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="emailNotifications"
                                    checked={profileData.emailNotifications}
                                    onCheckedChange={handleSwitchChange("emailNotifications")}
                                    disabled={!isEditing}
                                />
                                <Label htmlFor="emailNotifications">Receive email notifications</Label>
                            </div>
                            {!profileData.emailVerified && (
                                <div className="text-sm text-yellow-600 dark:text-yellow-400">
                                    Your email is not verified. Please check your inbox for a verification email.
                                </div>
                            )}
                            {isEditing && <Button type="submit">Save Changes</Button>}
                        </form>
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
        </div>
    )
}

