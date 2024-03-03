import express, { json, Request, Response, NextFunction } from "express";
import cors from "cors";
import { createStripeCheckoutSession } from "./checkout";
import { createPaymentIntent } from "./payments";
import { handleStripeWebhook } from "./webhooks";
export const app = express();

app.use(
  json({
    verify: (req, res, buf) => (req["rawBody"] = buf),
  })
);
app.use(cors({ origin: true }));

// This function runs async functions and catch errors
function runAsync(cb: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res, next).catch(next);
  };
}

// Create a new checkout session
app.post(
  "/checkout",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items));
  })
);

// Payment Intent
app.post(
  "/payments",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createPaymentIntent(body.amount));
  })
);

app.post("/hooks", runAsync(handleStripeWebhook));
