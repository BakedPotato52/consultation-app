import { getServerSession } from "next-auth/next"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {/* Dashboard content will go here */}
              <p className="text-center mt-8">Welcome, {session.user?.name}!</p>
              <p className="text-center">Role: {session.user?.role}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

