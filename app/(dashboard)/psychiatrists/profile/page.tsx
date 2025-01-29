import type { Metadata } from "next"
import { ProfileContent } from "../../../components/patient/profile-content"

export const metadata: Metadata = {
    title: "Patient Profile",
    description: "View and edit your profile information",
}

export default function ProfilePage() {
    return <ProfileContent />
}

