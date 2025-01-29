import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Analytics",
    description: "View your practice analytics",
}

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p>Analytics dashboard will be implemented here.</p>
        </div>
    )
}

