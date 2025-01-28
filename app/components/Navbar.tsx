"use client"

import { useState, useEffect } from "react"
import { Bell, MessageCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import ThemeSwitcher from "./ThemeSwitcher"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const { data: session, status } = useSession()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <nav className="flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex-1 md:flex-initial">
                <form className="hidden md:flex items-center space-x-2">
                    <div className="relative rounded-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 w-[200px] md:w-[300px] bg-background rounded-full dark:text-white"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-muted-foreground hover:text-foreground" aria-label="Messages">
                    <MessageCircle className="h-5 w-5" />
                </button>
                <button className="relative p-2 text-muted-foreground hover:text-foreground" aria-label="Notifications">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        1
                    </span>
                </button>
                <ThemeSwitcher />
                {status === "authenticated" && session?.user && (
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <p className="text-sm font-medium dark:text-white">{session.user.name}</p>
                            <span className="text-xs text-muted-foreground">{session.user.role}</span>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

