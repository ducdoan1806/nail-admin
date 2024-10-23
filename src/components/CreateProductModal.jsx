import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CreateProductModal = ({ onClose }) => {
  const { categories } = useSelector((state) => state.category);
  const [productData, setProductData] = useState({
    name: "",
    detail: "",
    description: "",
    category: "",
  });
  const handleSubmit = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-times h-5 w-5"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} method="POST" className="p-4">
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              required
            >
              {categories.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Product name ..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Details
            </label>
            <textarea
              id="detail"
              name="detail"
              value={productData.detail}
              onChange={handleChange}
              rows={3}
              placeholder="Detail ..."
              className="resize-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Description ..."
              className="resize-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
CreateProductModal.propTypes = {
  onClose: PropTypes.func,
};
export default CreateProductModal;
