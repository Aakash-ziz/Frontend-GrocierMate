import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const Buying = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token not found.');
        }

        const response = await axios.get('http://127.0.0.1:5000/product/all', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('API Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Buying Page</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isExpired = dayjs().isAfter(dayjs(product.expiry_date));

            return (
              <div
                key={product.id}
                className={`border rounded-lg shadow-lg p-4 transition transform hover:scale-105 ${
                  isExpired ? 'bg-red-100' : 'bg-green-100'
                }`}
              >
                <img
                  src={product.image_url}
                  alt={product.type}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.type}</h2>
                <p className="text-gray-600 mb-2">{product.details}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Created At: {dayjs(product.create_at).format('MMM DD, YYYY h:mm A')}
                </p>
                <p
                  className={`font-semibold text-lg ${
                    isExpired ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {isExpired ? 'Expired' : 'Still Valid'}{' '}
                  <span className="text-sm">
                    ({dayjs(product.expiry_date).format('MMM DD, YYYY h:mm A')})
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  User ID: <span className="font-semibold">{product.user_id}</span>
                </p>
                <p
                  className={`text-sm font-semibold ${
                    product.is_sold ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {product.is_sold ? 'Sold' : 'Available'}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-700">No products for buying.</p>
      )}
    </div>
  );
};

export default Buying;
