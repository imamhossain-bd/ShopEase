import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../../lib/CartContext";

const CheckoutModalButton = () => {
  const { clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handlePlaceOrder = () => {
    // Basic validation
    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill all the fields");
      return;
    }

    toast.success(`Order Placed Successfully! Thank you for your order, ${form.name}`);
    clearCart();
    setOpen(false);
    setForm({ name: "", email: "", address: "" });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full bg-white text-black px-4 py-2 rounded font-semibold">
        Checkout </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-black border border-gray-500 text-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
            <input type="text" placeholder="Full Name" className="w-full border border-gray-700 bg-black p-2 mb-2 text-white placeholder-gray-400 rounded"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
            <input type="email" placeholder="Email" className="w-full border border-gray-700 bg-black p-2 mb-2 text-white placeholder-gray-400 rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
            <textarea placeholder="Shipping Address" className="w-full border border-gray-700 bg-black p-2 mb-4 text-white placeholder-gray-400 rounded resize-none" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={4}/>
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border border-gray-500 rounded text-white hover:bg-gray-800 transition">Cancel </button>
              <button onClick={handlePlaceOrder} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"> Place Order </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast container at top-right */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default CheckoutModalButton;
