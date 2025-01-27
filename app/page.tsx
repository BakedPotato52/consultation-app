import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./lib/auth"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

export default async function Home() {
  const sessions = await getServerSession(authOptions)
  const { data: session } = useSession()
  const role = session?.user?.role
  console.log(role);


  if (sessions) {
    redirect(`/dashboard/${role}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to Patient Consultation</h1>
          <p className="mt-2 text-center text-sm text-gray-600">Connect with psychiatrists for online consultations</p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Link
              href="/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </Link>
          </div>
          <div>
            <Link
              href="/register"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

