import { Suspense } from "react"
import { ConsultationContent } from "./consultation-content"
import { Loader2 } from "lucide-react"

export default async function ConsultationPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <Suspense fallback={<LoadingUI />}>
            <ConsultationContent consultationId={id} />
        </Suspense>
    )
}

function LoadingUI() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
        </div>
    )
}

