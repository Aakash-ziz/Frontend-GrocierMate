import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Warehouse = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    details: '',
    expiry_date: '',
  });
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/product/myproducts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/product/',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prev) => [...prev, response.data]);
      setFormData({ type: '', details: '', expiry_date: '' });
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      type: product.type,
      details: product.details,
      expiry_date: product.expiry_date.split('.')[0],
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      await axios.put(
        'http://localhost:5000/product/update',
        { ...formData, id: editProduct.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editProduct.id ? { ...product, ...formData } : product
        )
      );
      setEditProduct(null);
      setFormData({ type: '', details: '', expiry_date: '' });
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (productId) => {
    if (!imageFile) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('image', imageFile);

      await axios.post(`http://localhost:5000/product/${productId}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image uploaded successfully!');
      setImageFile(null);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Warehouse</h1>

      <form
        onSubmit={editProduct ? handleUpdateSubmit : handleFormSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-bold mb-4">
          {editProduct ? 'Update Product' : 'Add New Product'}
        </h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Expiry Date</label>
          <input
            type="datetime-local"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Processing...' : editProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-xl font-bold">{product.type}</h3>
              <p className="text-gray-600 mb-2">{product.details}</p>
              <p className="text-sm text-gray-500">
                Expiry Date: {new Date(product.expiry_date).toLocaleString()}
              </p>
              <button
                onClick={() => handleEditClick(product)}
                className="text-blue-500 underline mt-2 block"
              >
                Edit
              </button>
              <div className="mt-4">
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="mb-2"
                />
                <button
                  onClick={() => handleImageUpload(product.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Upload Image
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
  );
};

export default Warehouse;
