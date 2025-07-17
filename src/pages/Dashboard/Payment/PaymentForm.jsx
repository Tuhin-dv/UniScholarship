import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


function PaymentForm({ scholarship, onPaymentSuccess }) {
 const axiosSecure = useAxiosSecure();
  const { applicationFees: amount } = scholarship;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Error getting client secret:", err));
    }
  }, [amount, axiosSecure]); // ✅ dependency te axiosSecure o dite hobe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (error) {
      console.error("Payment error:", error.message);
      setProcessing(false);
    } else {
      console.log("Payment success:", paymentIntent);
      setPaymentSuccess(paymentIntent.id);
      onPaymentSuccess(); // ✅ Notify parent
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-xl space-y-4">
      <h3 className="text-lg font-bold text-gray-700">Pay with Card</h3>

      <div className="border p-3 rounded">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || paymentSuccess} // ✅ Disable if payment is done
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>

      {paymentSuccess && (
        <p className="text-green-600 text-sm text-center mt-2">
          ✅ Payment successful! <br />
          <span className="font-semibold">Transaction ID:</span> {paymentSuccess}
        </p>
      )}
    </form>
  );
}

export default PaymentForm;
