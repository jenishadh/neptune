// components/max-width-wrapper
type MaxWidthWrapperProps = {
  className?: string
  children: React.ReactNode
}

// features/auth/components/auth-wrapper
type AuthWrapperProps = {
  title: string
  description: string
  children: React.ReactNode
  type: "login" | "register"
}