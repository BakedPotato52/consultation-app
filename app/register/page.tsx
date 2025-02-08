"use client"

import React, { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })
const MotionForm = dynamic(() => import("framer-motion").then((mod) => mod.motion.form), { ssr: false })

const RegisterPage: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)

      try {
        const formData = new FormData(e.currentTarget)
        const password = formData.get("password") as string
        const hashedPassword = password // In a real app, you'd hash the password here

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            password: hashedPassword,
            role: formData.get("role"),
          }),
        })

        if (!response.ok) {
          throw new Error("Registration failed")
        }

        router.push("/login")
        toast.success("Registration successful. Please login with your credentials.")
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
      </div>
    )
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
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <MotionForm onSubmit={handleSubmit} className="space-y-4" {...formAnimation}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  autoCapitalize="words"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
              </div>
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
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Role</Label>
                <RadioGroup name="role" defaultValue="PATIENT" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PATIENT" id="patient" />
                    <Label htmlFor="patient">Patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PSYCHIATRIST" id="psychiatrist" />
                    <Label htmlFor="psychiatrist">Psychiatrist</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </MotionForm>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  )
})

RegisterPage.displayName = "RegisterPage"

export default RegisterPage

