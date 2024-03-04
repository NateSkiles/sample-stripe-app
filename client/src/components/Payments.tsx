import React, { useState } from "react";
import { fetchFromAPI } from "../utils";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

interface PaymentIntent {
  client_secret: string | null;
  status: string;
}

export default function Payments() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();

  // Create a payment intent on the server
  const createPaymentIntent = async () => {
    // Limit amount to Stripe min/max
    const validAmount = Math.min(Math.max(amount, 50), 9999999);
    setAmount(validAmount);

    // Make the API Request
    const pi = await fetchFromAPI("payments", {
      method: "POST",
      body: { amount: validAmount },
    });
    setPaymentIntent(pi);
  };

  // Handle the submission of card details
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return console.error("Stipe.js or Elements has not loaded.");
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement && paymentIntent) {
      // Confirm Card Payment
      const { paymentIntent: updatedPaymentIntent, error } =
        await stripe.confirmCardPayment(paymentIntent.client_secret!, {
          payment_method: { card: cardElement },
        });

      if (error) {
        console.error(error);
        setPaymentIntent(error.payment_intent);
        navigate("/failed");
      } else {
        setPaymentIntent(updatedPaymentIntent);
        navigate("/success");
      }
    } else console.error("Missing Card Element or Payment Intent");
  };

  return (
    <>
      <div className="container mx-auto">
        <input
          type="number"
          value={amount}
          disabled={!!paymentIntent}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-slate-300 m-4 p-2 text-lg text-slate-900 rounded-md"
        />
        <button
          disabled={amount <= 0}
          onClick={createPaymentIntent}
          hidden={!!paymentIntent}
          className="bg-slate-700 m-5 rounded-md"
        >
          Ready to Pay ${(amount / 100).toFixed(2)}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <CardElement className="bg-slate-300 m-10 p-10 rounded-md text-lg" />
        <button className="bg-slate-700" type="submit">
          Pay
        </button>
      </form>
    </>
  );
}
