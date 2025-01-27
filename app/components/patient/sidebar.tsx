"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, FileText, Home, MessageCircle, Settings, User } from "lucide-react"

const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/patient" },
    { icon: CalendarDays, label: "Appointments", href: "/dashboard/patient/appointments" },
    { icon: FileText, label: "Medical Records", href: "/dashboard/patient/records" },
    { icon: MessageCircle, label: "Messages", href: "/dashboard/patient/messages" },
    { icon: User, label: "Profile", href: "/dashboard/patient/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/patient/settings" },
]

export function PatientSidebar() {
    const pathname = usePathname()

    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors ${pathname === item.href ? "bg-gray-700" : ""
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

