"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { type LucideIcon, MoreHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { menuItems } from "../menuItems"
import { useSession } from "next-auth/react"


export function PatientSidebar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()

    const visibleItems = menuItems.flatMap((section) => section.items.filter((item) => item.visible.includes("patient")))

    const renderMenuItem = (item: (typeof visibleItems)[0], index: number) => {
        const IconComponent = item.icon as LucideIcon
        const isActive = pathname === item.href
        return (
            <li key={item.label} className={index >= 4 ? "lg:hidden" : ""}>
                <Link
                    href={item.href}
                    className={`flex sticky bottom-0 max-md:flex-col items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    aria-label={item.label}
                    onClick={() => setOpen(false)}
                >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                    <span>{item.label}</span>
                </Link>
            </li>
        )
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden sticky top-0 md:flex flex-col w-64 h-screen bg-background border-r">
                <div className="p-4">
                    <Link href={`/${session?.user.role}`} className="flex items-center gap-2 mb-8" aria-label="ConsultantApp Home">
                        <Image src="/logo.png" className="w-8 h-8" alt="" width={32} height={32} />
                        <span className="font-bold text-xl">ConsultApp</span>
                    </Link>
                    <nav aria-label="Main Navigation">
                        {menuItems.map((section) => (
                            <div key={section.title} className="mb-6">
                                <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-3">{section.title}</h2>
                                <ul className="space-y-1">
                                    {section.items
                                        .filter((item) => item.visible.includes("patient"))
                                        .map((item) => renderMenuItem(item, 0))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 dark:bg-current bg-white border-t border-gray-200 z-50" aria-label="Mobile Navigation">
                <ul className="flex justify-around items-center h-16">
                    {visibleItems.slice(0, 3).map((item, index) => renderMenuItem(item, index))}
                    <li key="more-options">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="More options" className="w-full flex hover:bg-primary h-full">
                                    <div className="flex flex-col items-center justify-center gap-1 p-2 text-gray-500  transition-colors duration-200">
                                        <MoreHorizontal />
                                        <span className="text-xs mt-1 ">More</span>
                                    </div>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80dvh]">
                                <nav aria-label="More Navigation Options">
                                    <ul className="grid grid-cols-3 gap-4 pt-4">
                                        {visibleItems.slice(3).map((item, index) => renderMenuItem(item, index + 3))}
                                    </ul>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </li>
                </ul>
            </nav>
        </>
    )
}
