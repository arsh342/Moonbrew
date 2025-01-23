import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user === undefined) {
      setIsLoading(true)
    } else if (!user) {
      router.replace("/auth/signin")
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-50">
        <div className="h-12 w-12 border-t-4 border-emerald-600 border-r-4 border-emerald-300 rounded-full animate-spin" />
      </div>
    )
  }

  return user ? children : null
}

