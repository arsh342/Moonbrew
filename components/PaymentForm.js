import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "/icons/card.svg",
    description: "Pay securely with your card",
  },
  {
    id: "upi",
    name: "UPI",
    icon: "/icons/upi.svg",
    description: "Pay using UPI apps like GPay, PhonePe",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: "/icons/bank.svg",
    description: "Pay directly from your bank account",
  },
]

const banks = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "sbi", name: "State Bank of India" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
  { id: "other", name: "Other Banks" },
]

export default function PaymentForm({ total, onPaymentComplete }) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const [upiId, setUpiId] = useState("")

  const [selectedBank, setSelectedBank] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (selectedMethod === "card") {
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
          throw new Error("Please fill in all card details")
        }
      } else if (selectedMethod === "upi") {
        if (!upiId) {
          throw new Error("Please enter UPI ID")
        }
      } else if (selectedMethod === "netbanking") {
        if (!selectedBank) {
          throw new Error("Please select a bank")
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))

      onPaymentComplete({
        method: selectedMethod,
        status: "success",
        transactionId: "TX" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-emerald-900">Payment Method</h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-4 mb-8">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.id ? "border-emerald-500 bg-emerald-50" : "hover:border-emerald-400"
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative">
                <Image src={method.icon || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-medium text-emerald-900">{method.name}</h3>
                <p className="text-sm text-emerald-600">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {selectedMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">Card Number</label>
              <input
                type="text"
                maxLength="16"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">CVV</label>
                <input
                  type="password"
                  maxLength="3"
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "upi" && (
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">UPI ID</label>
            <input
              type="text"
              placeholder="username@upi"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {selectedMethod === "netbanking" && (
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">Select Bank</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Select a bank</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-full font-semibold text-white ${
              loading ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-700 hover:bg-emerald-800"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

