import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartPage from "../CartPage/CartPage";
import { useCart } from "../../lib/CartContext";

const Home = () => {
  const { setIsCartOpen } = useCart();

  return (
    <div>
      <div className="relative flex flex-col justify-center items-center text-center px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center",
          minHeight: "calc(120vh - 80px)",}}>
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Discover Quality Products
          </h1>
          <p className="mb-8 max-w-xl text-white">
            Shop our curated collection of premium products designed to enhance
            your everyday life.
          </p>
          <button href="/cartpage" onClick={() => setIsCartOpen(true)} className="bg-white text-black px-6 py-3 rounded shadow flex items-center gap-2 hover:bg-gray-200 transition">
            <FiShoppingCart />Shop Now</button>
        </div>
      </div>

      <div>
        <CartPage />
      </div>
    </div>
  );
};

export default Home;
