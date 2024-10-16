import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getProductDetailApi,
  updateProductDetailApi,
} from "../features/products/api";
import ProductImage from "../components/ProductImage";
import ProductVariants from "../components/ProductVariants";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const { product } = useSelector((state) => state?.productDetail);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProductDetailApi((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically send the updated product data to your backend
    console.log("Saving product:", product);
    setIsEditing(false);
  };
  useEffect(() => {
    dispatch(
      getProductDetailApi(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      )
    );
  }, [dispatch, location.pathname]);
  return (
    <div>
      <Link to="/products" className="text-pink-600 hover:text-pink-800">
        <i className="fas fa-arrow-left mr-2 mb-4"></i>
        Back to Products
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
              <i className="fa-solid fa-layer-group mr-2"></i>
              Category
            </button>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
              >
                <i className="fas fa-save mr-2"></i>Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
              >
                <i className="fas fa-edit mr-2"></i>Edit
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          <div
            className="flex flex-col lg:flex-row gap-6 overflow-auto"
            style={{ height: "calc(100vh - 270px)" }}
          >
            <ProductImage productImages={product?.images || []} />

            <div className="lg:w-2/3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={product?.name}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{product?.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                {isEditing ? (
                  <select
                    name="category"
                    value={product?.category.id}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
                  >
                    <option value={1}>Other</option>
                    {/* Add more categories as needed */}
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {product?.category.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={product?.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
                  ></textarea>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {product?.description}
                  </p>
                )}
              </div>

              <ProductVariants productDetail={product?.detail_products || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
