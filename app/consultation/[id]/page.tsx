import { Suspense } from "react"
import { ConsultationContent } from "./consultation-content"
import { Loader2 } from "lucide-react"

export default function ConsultationPage({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<LoadingUI />}>
            <ConsultationContent consultationId={params.id} />
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

