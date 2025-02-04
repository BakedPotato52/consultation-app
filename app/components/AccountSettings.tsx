import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, FileText } from "lucide-react"

const AccountSettings = memo(() => {
    return (
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
    )
})

AccountSettings.displayName = "AccountSettings"

export default AccountSettings

