import { config } from "dotenv";
import { stripe } from "./";
import Stripe from "stripe";

config();

export async function createStripeCheckoutSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
}
