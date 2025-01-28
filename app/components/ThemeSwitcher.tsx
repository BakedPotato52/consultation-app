'use client'

import React from 'react'
import { useTheme } from '@/components/theme-provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Moon, Sun, Laptop } from 'lucide-react'

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    return (
        <div className='dark:text-white'>

            <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">
                        <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="system">
                        <div className="flex items-center gap-2">
                            <Laptop className="h-4 w-4" />
                            <span>System</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}