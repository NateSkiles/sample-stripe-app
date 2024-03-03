import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar, Home, Checkout } from "./components";

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
