import { Home, CalendarDays, FileText, MessageCircle, User, Settings, Users, BarChart2, Shield } from "lucide-react"
import { UserRole } from "@prisma/client"

export const MenuItems = (role: UserRole) => [
    {
        title: "Main",
        items: [
            {
                label: "Dashboard",
                icon: Home,
                href: `/${role.toLowerCase()}`,
                visible: [UserRole.PATIENT, UserRole.PSYCHIATRIST, UserRole.ADMIN],
            },
            {
                label: "Consultations",
                icon: CalendarDays,
                href: `/${role.toLowerCase()}/consultations`,
                visible: [UserRole.PATIENT],
            },
            {
                label: "Medical Records",
                icon: FileText,
                href: `/${role.toLowerCase()}/records`,
                visible: [UserRole.PATIENT],
            },
            {
                label: "Messages",
                icon: MessageCircle,
                href: `/${role.toLowerCase()}/messages`,
                visible: [UserRole.PATIENT],
            },
            {
                label: "Patients",
                icon: Users,
                href: `/${role.toLowerCase()}/patients`,
                visible: [UserRole.PSYCHIATRIST, UserRole.ADMIN],
            },
            {
                label: "Appointments",
                icon: CalendarDays,
                href: `/${role.toLowerCase()}/appointments`,
                visible: [UserRole.PSYCHIATRIST],
            },
            {
                label: "Analytics",
                icon: BarChart2,
                href: `/${role.toLowerCase()}/analytics`,
                visible: [UserRole.PSYCHIATRIST, UserRole.ADMIN],
            },
            {
                label: "User Management",
                icon: Shield,
                href: `/${role.toLowerCase()}/users`,
                visible: [UserRole.ADMIN],
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                label: "Profile",
                icon: User,
                href: `/${role.toLowerCase()}/profile`,
                visible: [UserRole.PATIENT, UserRole.PSYCHIATRIST, UserRole.ADMIN],
            },
            {
                label: "Settings",
                icon: Settings,
                href: `/${role.toLowerCase()}/settings`,
                visible: [UserRole.PATIENT, UserRole.PSYCHIATRIST, UserRole.ADMIN],
            },
        ],
    },
]

