import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Checkout } from "./components/Checkout";
import NavBar from "./components/NavBar";

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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <h2>Stripe React + Node.js</h2>
    </>
  );
}
