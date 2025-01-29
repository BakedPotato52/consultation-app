"use client"

import { useState, useEffect } from "react"
import { Bell, MessageCircle, Search, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeSwitcher from "./ThemeSwitcher"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const { data: session, status } = useSession()
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push("/login") // Redirect to login page after logout
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuItem className="flex-col items-start">
                                <div className="text-sm font-medium">{session.user.name}</div>
                                <div className="text-xs text-muted-foreground">{session.user.role}</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    )
}

