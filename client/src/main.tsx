import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51OpOqbIFcOSMSnu53MbLqNo0RI6WFoN9oSd3zbBj4QTQRzqp85AiAfV1gDzUBADdiaVR1GZZ6eHt2KVqNEXvpNFU00hJrHwCrW"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
