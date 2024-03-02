import express, { json, Request, Response, NextFunction } from "express";
import cors from "cors";
export const app = express();

app.use(json());
app.use(cors({ origin: true }));

app.post("/test", (req: Request, res: Response) => {
  const amount = req.body.amount;

  res.status(200).send({ with_tax: amount * 7 });
});
