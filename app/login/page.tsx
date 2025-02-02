"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import dynamic from "next/dynamic"

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })
const MotionForm = dynamic(() => import("framer-motion").then((mod) => mod.motion.form), { ssr: false })

const LoginPage: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/${session.user.role}`)
    }
  }, [status, session, router])

  useEffect(() => {
    const callbackUrl = searchParams.get("callbackUrl")
    if (callbackUrl && !callbackUrl.includes("_next/static") && !callbackUrl.includes("favicon.ico")) {
      sessionStorage.setItem("loginCallbackUrl", callbackUrl)
    }
  }, [searchParams])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          toast.error(result.error)
        } else {
          const callbackUrl = sessionStorage.getItem("loginCallbackUrl") || `/${session?.user?.role || ""}`
          sessionStorage.removeItem("loginCallbackUrl")
          router.push(callbackUrl)
          toast.success("Logged in successfully")
        }
      } catch (error) {
        toast.error("An error occurred during login")
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, router, session],
  )

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const cardAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }),
    [],
  )

  const formAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1 },
    }),
    [],
  )

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <MotionDiv {...cardAnimation}>
        <Card className="w-full max-w-md overflow-hidden">
          <MotionDiv
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"
          />
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <MotionForm onSubmit={handleSubmit} className="space-y-4" {...formAnimation}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </MotionForm>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  )
})

LoginPage.displayName = "LoginPage"

export default LoginPage

