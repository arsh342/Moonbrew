import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await resetPassword(email)
      toast.success('Password reset email sent. Check your inbox.')
    } catch (err) {
      toast.error('Failed to send password reset email: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-900 to-emerald-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-[#1e3932] mb-6 text-center">Reset Password</h2>
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
          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-brown-900 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-[#6b6b6b]">
            <Link href="/auth/signin" className="text-yellow-500 font-medium hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
