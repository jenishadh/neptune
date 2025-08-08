"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import { loginSchema } from "@/features/auth/schemas"
import { login } from "@/features/auth/actions"

import { AuthWrapper } from "./auth-wrapper"

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const pending = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setError(null)
    try {
      const result = await login(data)
      if (result?.message) {
        setError(result.message)
      }
      return
    } catch {
      setError("Something went wrong, please try again.")
    }
  }

  return (
    <AuthWrapper
      title="Welcome Back"
      description="Sign in to your account"
      type="login"
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="jenish@example.com"
                    type="email"
                    disabled={pending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      disabled={pending}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      disabled={pending}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icons.eyeOff className="h-4 w-4" />
                      ) : (
                        <Icons.eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!error && (
            <Alert className="bg-destructive/10 border-none">
              <Icons.octagonAlert className="!text-destructive size-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Icons.loaderCircle className="size-4 animate-spin" />}{" "}
            Sign In
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
