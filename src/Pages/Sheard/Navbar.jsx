
import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../lib/CartContext";
import CheckoutModalButton from "../../Component/Checkout/CheckoutModal";

const Navbar = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    subtotal,
    shipping,
    total,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const navbarBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-[rgba(255,255,255,0.8)] backdrop-blur-md";
  const textColor = isHome && !scrolled ? "text-white" : "text-black";

  return (
    <div>
      <nav
        className={`fixed w-full flex justify-between items-center px-6 py-4 z-10 transition-colors duration-300 ${navbarBg}`}
      >
        <h1 className={`text-xl font-bold ${textColor}`}>ShopEase</h1>

        <div className="flex items-center gap-6">
          <a href="/" className={`hover:underline ${textColor} hidden sm:block`}>
            Home
          </a>
          <a href="/products" className={`hover:underline ${textColor} hidden sm:block`}>
            Products
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <FiShoppingCart size={24} className={textColor} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 w-full sm:w-80 md:w-96 bg-black text-white h-full flex flex-col p-6 z-30"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <ShoppingBag className="h-16 w-16 text-gray-500 mb-4" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 mb-4 border-b border-gray-700 pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="px-2 bg-gray-800 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 bg-gray-800 rounded"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          ${item.price.toFixed(2)} each
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mb-4">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <CheckoutModalButton />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
