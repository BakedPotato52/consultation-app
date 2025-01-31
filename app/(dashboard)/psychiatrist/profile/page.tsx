import type { Metadata } from "next"
import { Suspense } from "react"
import { PsychiatristProfile } from "../../../components/psychiatrist/profile"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
    title: "Psychiatrist Profile",
    description: "View and edit your professional profile",
}

export default function PsychiatristProfilePage() {
    return (

        <Suspense fallback={<ProfileSkeleton />}>
            <PsychiatristProfile />
        </Suspense>

    )
}

function ProfileSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
        </div>
    )
}

