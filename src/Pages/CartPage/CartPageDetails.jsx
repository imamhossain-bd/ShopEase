import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../lib/CartContext';


const CartPageDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/CartFakeData.json');
      const data = await res.json();
      const foundProduct = data.find((item) => item.id.toString() === id);
      setProduct(foundProduct);
    };
    fetchData();
  }, [id]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product) {
    return (
      <div className="text-center py-20 text-white bg-black min-h-screen">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-10 py-20">
      <Link to="/" className="text-sm text-black rounded-lg mt-[30px] px-[10px] py-[10px] bg-[#fff] mb-6 inline-block">
        ← Back to products
      </Link>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <img src={product.image} alt={product.title} className="rounded-lg w-full object-cover shadow-lg"/>

        {/* Product Details */}
        <div>
          <span className="bg-gray-800 text-xs px-2 py-1 rounded-md uppercase text-white mb-3 inline-block">
            {product.category}
          </span>

          {/* Title and Price */}
          <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
          <p className="text-2xl font-semibold text-gray-300 mb-6">${product.price.toFixed(2)}</p>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Feature List */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {product.features && product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-700 rounded">
              <button className="px-3 py-1 text-xl hover:bg-gray-700" onClick={decreaseQty}>−</button>
              <span className="px-4">{quantity}</span>
              <button className="px-3 py-1 text-xl hover:bg-gray-700" onClick={increaseQty}>+</button>
            </div>

            {/* Add to Cart Button */}
            <button onClick={() => addToCart(product, quantity)} className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"><FiShoppingCart className="text-lg"/> Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageDetails;
