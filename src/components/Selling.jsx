import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Selling = () => {
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
          setProducts([]); // Ensure products is an empty array if no data is returned
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Buying Page</h1>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product.id} className="border p-4 my-4 rounded shadow">
              <h2 className="text-xl font-bold">{product.type}</h2>
              <p>{product.details}</p>
              <p className={`font-semibold ${product.is_sold ? 'text-red-600' : 'text-green-600'}`}>
                {product.is_sold ? 'Sold' : 'Available'}
              </p>
              <img
                src={product.image_url}
                alt={product.type}
                width="200"
                className="mt-2 border rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No products for Buying.</p>
      )}
    </div>
  );
};

export default Selling;
