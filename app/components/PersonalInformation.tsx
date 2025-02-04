import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface PersonalInformationProps {
    profileData: {
        image: string;
        name: string;
        email: string;
        phoneNumber: string;
        bio: string;
        smsNotifications: boolean;
        emailNotifications: boolean;
        emailVerified: boolean;
    };
    isEditing: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSwitchChange: (field: string) => (checked: boolean) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PersonalInformation = memo(({ profileData, isEditing, handleInputChange, handleSwitchChange, handleSubmit }: PersonalInformationProps) => {
    return (
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
    )
})

PersonalInformation.displayName = "PersonalInformation"

export default PersonalInformation

