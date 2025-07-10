import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

function PaymentForm({ amount = 5000 }) {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(null)

  // Get clientSecret from backend
  useEffect(() => {
    if (amount > 0) {
      axios
        .post('http://localhost:5000/create-payment-intent', { amount })
        .then((res) => {
          setClientSecret(res.data.clientSecret)
        })
        .catch((err) => console.error('Error fetching client secret:', err))
    }
  }, [amount])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) return

    setProcessing(true)

    const card = elements.getElement(CardElement)
    if (!card) return

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    })

    if (error) {
      console.error('[Payment error]', error.message)
      setProcessing(false)
    } else {
      console.log('[Payment success]', paymentIntent)
      setPaymentSuccess(paymentIntent.id)
      setProcessing(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full p-6 bg-white shadow rounded-xl space-y-6"
    >
      <h2 className="text-xl font-bold text-center text-gray-800">Pay with Card</h2>

      <div className="border p-4 rounded">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>

      {paymentSuccess && (
        <p className="text-green-600 text-center">
          ✅ Payment successful! Transaction ID: {paymentSuccess}
        </p>
      )}
    </form>
  )
}

export default PaymentForm
