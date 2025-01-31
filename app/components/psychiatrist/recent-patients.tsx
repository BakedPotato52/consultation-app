import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentPatients = [
    {
        name: "Olivia Johnson",
        email: "olivia.johnson@example.com",
        avatar: "/avatars/01.png",
    },
    {
        name: "William Chen",
        email: "william.chen@example.com",
        avatar: "/avatars/02.png",
    },
    {
        name: "Sophia Patel",
        email: "sophia.patel@example.com",
        avatar: "/avatars/03.png",
    },
    {
        name: "Liam Rodriguez",
        email: "liam.rodriguez@example.com",
        avatar: "/avatars/04.png",
    },
    {
        name: "Emma Davis",
        email: "emma.davis@example.com",
        avatar: "/avatars/05.png",
    },
]

export function RecentPatients() {
    return (
        <div className="space-y-8">
            {recentPatients.map((patient) => (
                <div key={patient.email} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback>
                            {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

