import { useState } from "react";
import { fetchFromAPI } from "../utils";
import { useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { Product } from "../types";

export function Checkout() {
  const stripe = useStripe();

  const [product, setProduct] = useState({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Hat",
        description: "Pug hat. A hat your pug will love.",
        images: [
          "https://as2.ftcdn.net/v2/jpg/02/13/29/95/1000_F_213299558_bEP7S4MdC9I9ArFITlAhryJsiqakr6xJ.jpg",
        ],
      },
      unit_amount: 799,
    },
    quantity: 0,
  });

  const changeQuantity = (v: number) =>
    setProduct({ ...product, quantity: Math.max(0, product.quantity + v) });

  const handleClick = async () => {
    const body: { line_items: Product[] } = { line_items: [product] };
    const { id: sessionId } = await fetchFromAPI("checkout", {
      method: "POST",
      body,
    });

    const response: { error: StripeError } | undefined =
      await stripe?.redirectToCheckout({
        sessionId,
      });

    if (response?.error !== undefined) {
      console.error(response.error);
    }
  };

  return (
    <>
      <div>
        <h3>{product.price_data.product_data.name}</h3>
        <h4>Stripe Amount: {product.price_data.unit_amount}</h4>

        <img
          src={product.price_data.product_data.images[0]}
          width="250px"
          alt="product"
        />

        <button onClick={() => changeQuantity(-1)}>-</button>
        <span>{product.quantity}</span>
        <button onClick={() => changeQuantity(1)}>+</button>
      </div>

      <hr />

      <button onClick={handleClick} disabled={product.quantity < 1}>
        Start Checkout
      </button>
    </>
  );
}

export function CheckoutSuccess() {
  return <h1 className="m-4 p-4">Checkout Success</h1>;
}

export function CheckoutFail() {
  return <h1 className="m-4 p-4">Checkout Failed</h1>;
}
