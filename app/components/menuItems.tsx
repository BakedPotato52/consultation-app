import { Home, CalendarDays, FileText, MessageCircle, User, Settings, Users, BarChart2 } from "lucide-react"

export const MenuItems = (role: any) => [

    {
        title: "Main",
        items: [
            {
                label: "Dashboard",
                icon: Home,
                href: `/${role}`,
                visible: ["patient", "psychiatrists"],
            },
            {
                label: "Consultations",
                icon: CalendarDays,
                href: `/${role}/consultations`,
                visible: ["patient"],
            },
            {
                label: "Medical Records",
                icon: FileText,
                href: `/${role}/records`,
                visible: ["patient"],
            },
            {
                label: "Messages",
                icon: MessageCircle,
                href: `/${role}/messages`,
                visible: ["patient"],
            },
            {
                label: "Patients",
                icon: Users,
                href: `/${role}/patients`,
                visible: ["psychiatrists"],
            },
            {
                label: "Appointments",
                icon: CalendarDays,
                href: `/${role}/appointments`,
                visible: ["psychiatrists"],
            },
            {
                label: "Analytics",
                icon: BarChart2,
                href: `/${role}/analytics`,
                visible: ["psychiatrists"],
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                label: "Profile",
                icon: User,
                href: `/${role}/profile`,
                visible: ["patient", "psychiatrists"],
            },
            {
                label: "Settings",
                icon: Settings,
                href: `/${role}/settings`,
                visible: ["patient", "psychiatrists"],
            },
        ],
    },
]

