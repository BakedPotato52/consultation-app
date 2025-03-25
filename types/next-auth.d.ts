import { UserRole, UserStatus } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        emailVerified?: Date | null;
        image?: string | null;
        role: UserRole;
        status: UserStatus;
        bio?: string | null;
        phoneNumber?: string | null;
        cost?: number | null;
        emailNotifications: boolean;
        smsNotifications: boolean;
        lastLoginAt?: Date | null;
    }

    interface Session {
        user: User & {
            id: string;
            role: UserRole;
            status: UserStatus;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
        status: UserStatus;
    }
}

