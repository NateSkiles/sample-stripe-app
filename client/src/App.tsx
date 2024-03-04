import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  NavBar,
  Home,
  Checkout,
  CheckoutSuccess,
  CheckoutFail,
  Payments,
} from "./components";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/success" element={<CheckoutSuccess />} />
            <Route path="/failed" element={<CheckoutFail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
