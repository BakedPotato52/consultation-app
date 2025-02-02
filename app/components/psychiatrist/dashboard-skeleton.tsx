import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
function DashboardSkeleton() {
    return (
        <Skeleton className="space-y-6">
            <h1 className="text-3xl font-bold">
                <Skeleton />
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"><Skeleton /></CardTitle>
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><Skeleton /></div>
                        <p className="text-xs text-muted-foreground"><Skeleton /></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"><Skeleton /></CardTitle>
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><Skeleton /></div>
                        <p className="text-xs text-muted-foreground"><Skeleton /></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"><Skeleton /></CardTitle>
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><Skeleton /></div>
                        <p className="text-xs text-muted-foreground"><Skeleton /></p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle><Skeleton /></CardTitle>
                    <CardDescription><Skeleton /></CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton />
                </CardContent>
            </Card>
        </Skeleton>
    )
}

export default DashboardSkeleton
