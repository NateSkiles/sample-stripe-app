import { stripe } from "./";

// Create a Payment Intent with specific amount and currency
export async function createPaymentIntent(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    // recipient_email: admin@nateskiles.dev
  });

  paymentIntent.status;

  return paymentIntent;
}
