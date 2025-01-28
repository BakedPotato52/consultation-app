import { getServerSession } from "next-auth/next"
import { authOptions } from "./lib/auth"
import { redirect } from "next/navigation"
import { RoleRedirect } from "./components/Role-Redirect"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // If no session exists, redirect to login
  if (!session) {
    redirect("/login")
  }

  // Use the client component for role-based routing
  return <RoleRedirect />
}

