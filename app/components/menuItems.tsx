import { Home, CalendarDays, FileText, MessageCircle, User, Settings } from "lucide-react"


export const menuItems = [
    {
        title: "Main",
        items: [
            {
                label: "Dashboard", icon: Home, href: "/patient", visible: ["patient"]
            },
            { label: "Consultations", icon: CalendarDays, href: " /patient/consultations", visible: ["patient"] },
            { label: "Medical Records", icon: FileText, href: "/patient/records", visible: ["patient"] },
            { label: "Messages", icon: MessageCircle, href: " /patient/messages", visible: ["patient"] },
        ],
    },
    {
        title: "Account",
        items: [
            { label: "Profile", icon: User, href: "/patient/profile", visible: ["patient"] },
            { label: "Settings", icon: Settings, href: "/patient/settings", visible: ["patient"] },
        ],
    },
]