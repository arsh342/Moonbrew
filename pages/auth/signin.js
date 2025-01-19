import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, googleSignIn } = useAuth()
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      router.push('/') // Redirect to the index page
    } catch (err) {
      setError('Failed to sign in: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await googleSignIn()
      router.push('/') // Redirect to the index page after Google sign-in
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f1e4d3] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-semibold text-[#1e3932] mb-6 text-center">Welcome Back</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#1e3932] text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-[#d4b499] rounded focus:ring focus:ring-[#1e3932]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#1e3932] text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-[#d4b499] rounded focus:ring focus:ring-[#1e3932]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#1e3932] text-white py-2 rounded font-medium hover:bg-[#163028]"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-[#d54b40] text-white py-2 rounded font-medium hover:bg-[#b53d35]"
          >
            Sign in with Google
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-[#6b6b6b]">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[#1e3932] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
