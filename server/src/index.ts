import { config } from "dotenv";
import Stripe from "stripe";
import { app } from "./api";

if (process.env.NODE_ENV !== "production") {
  config();
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
