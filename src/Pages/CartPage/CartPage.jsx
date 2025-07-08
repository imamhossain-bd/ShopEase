import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../lib/CartContext';

const CartPage = () => {
  const [allProduct, setAllProduct] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/CartFakeData.json');
      const data = await res.json();
      setAllProduct(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-2">Our Products</h2>
      <p className="text-center text-gray-400 mb-10">
        Browse our selection of high-quality products, carefully selected for you.
      </p>

      {allProduct.length === 0 ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProduct.map((product) => (
            <div key={product.id} className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* Clickable area */}
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h2 className="text-[16px] font-bold mb-2">{product.title}</h2>
                  <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                  <p className="text-gray-400 text-sm">{product.category}</p>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <div className="flex items-center justify-between p-4 pt-0">
                <span className="font-bold text-white">
                  ${product.price.toFixed(2)}
                </span>
                <button onClick={(e) => { e.stopPropagation(); addToCart(product, 1);}}
                  className="flex items-center gap-1 bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition"> <FiShoppingCart className="text-lg" />Add</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
