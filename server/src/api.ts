import express, { json, Request, Response, NextFunction } from "express";
import cors from "cors";
import { createStripeCheckoutSession } from "./checkout";
export const app = express();

app.use(json());
app.use(cors({ origin: true }));

// This function runs async functions and catch errors
function runAsync(callback: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
}

// Create a new checkout session
app.post(
  "/checkout/",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items));
  })
);
