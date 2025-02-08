import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function DasboardSk() {
    return (
        <div className="container mx-auto p-6">
            <Skeleton className="h-10 w-1/3 mb-6" />

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-1/2" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-20 w-20 rounded-full" />
                            <div>
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-2/3" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-40 mb-4" />
                        <Skeleton className="h-4 w-56 mb-4" />
                        <Skeleton className="h-10 w-40" />
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-1/3" /></CardTitle>
                        <Skeleton className="h-4 w-40" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-1/3" /></CardTitle>
                        <Skeleton className="h-4 w-40" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DasboardSk
