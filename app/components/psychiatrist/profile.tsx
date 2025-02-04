"use client"

import React, { useState, useEffect, useCallback, useMemo, Suspense } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import dynamic from "next/dynamic"

import PersonalInformation from "../PersonalInformation"
import { PersonalInformationSkeleton, AccountSettingsSkeleton } from "../Skeletons"

const AccountSettings = dynamic(() => import("../AccountSettings"), {
    loading: () => <AccountSettingsSkeleton />,
})

interface PsychiatristData {
    id: string
    name: string
    email: string
    bio: string
    image: string
    phoneNumber: string
    smsNotifications: boolean
    emailNotifications: boolean
    emailVerified: boolean
}
interface ErrorBoundaryState {
    hasError: boolean
}
interface ErrorBoundaryProps {
    children: React.ReactNode
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
    const [hasError, setHasError] = useState<ErrorBoundaryState["hasError"]>(false)

    if (hasError) {
        return <div className="text-red-700">Something went wrong. Please try again later.</div>
    }

    return (
        <React.Fragment>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) && React.cloneElement(child, {
                    onError: () => setHasError(true),
                }),
            )}
        </React.Fragment>
    )
}

export function PsychiatristProfile() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState<PsychiatristData | null>(null)

    const fetchProfileData = useCallback(async () => {
        try {
            const response = await fetch("/api/psychiatrist/profile")
            if (!response.ok) {
                throw new Error("Failed to fetch profile data")
            }
            const data = await response.json()
            setProfileData(data)
        } catch (error) {
            console.error("Error fetching profile data:", error)
            toast.error("Failed to load profile data")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfileData()
    }, [fetchProfileData])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileData((prev) => (prev ? { ...prev, [name]: value } : null))
    }, [])

    const handleSwitchChange = useCallback(
        (name: string) => (checked: boolean) => {
            setProfileData((prev) => (prev ? { ...prev, [name]: checked } : null))
        },
        [],
    )

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            setIsLoading(true)
            try {
                const response = await fetch("/api/psychiatrist/profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profileData),
                })
                if (!response.ok) {
                    throw new Error("Failed to update profile")
                }
                toast.success("Profile updated successfully")
                setIsEditing(false)
            } catch (error) {
                console.error("Error updating profile:", error)
                toast.error("Failed to update profile")
            } finally {
                setIsLoading(false)
            }
        },
        [profileData],
    )

    const memoizedPersonalInformation = useMemo(
        () => (
            <PersonalInformation
                profileData={profileData ?? { image: "", name: "", email: "", phoneNumber: "", bio: "", smsNotifications: false, emailNotifications: false, emailVerified: false }}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                handleSwitchChange={handleSwitchChange}
                handleSubmit={handleSubmit}
            />
        ),
        [profileData, isEditing, handleInputChange, handleSwitchChange, handleSubmit],
    )

    return (
        <ErrorBoundary>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Your Profile</h1>
                    <Button onClick={() => setIsEditing(!isEditing)} disabled={isLoading}>
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {isLoading ? <PersonalInformationSkeleton /> : memoizedPersonalInformation}
                    <Suspense fallback={<AccountSettingsSkeleton />}>
                        <AccountSettings />
                    </Suspense>
                </div>
            </div>
        </ErrorBoundary>
    )
}

