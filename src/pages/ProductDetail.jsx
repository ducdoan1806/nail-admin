import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteProductApi,
  getProductApi,
  updateProductApi,
} from "../features/products/api";
import ProductImage from "../components/ProductImage";
import ProductVariants from "../components/ProductVariants";
import Loading from "../components/Loading";
import Category from "../components/Category";
import NotifyModal from "../components/NotifyModal";
import productDetailSlice from "../features/products/productDetailSlice";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const { product, loading, message } = useSelector(
    (state) => state?.productDetail
  );
  const [productInfo, setProductInfo] = useState({
    id: 0,
    name: "",
    detail: "",
    description: "",
    category: 0,
  });

  const handleInputChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateProductApi(productInfo));
    setIsEditing(false);
  };
  const handleDelete = () => {
    dispatch(deleteProductApi(product?.id));
    setIsDel(false);
  };
  useEffect(() => {
    if (product) {
      setProductInfo({
        id: product?.id ?? 0,
        name: product?.name ?? "",
        detail: product?.detail ?? "",
        description: product?.description ?? "",
        category: product?.category ?? 0,
      });
    }
  }, [product]);

  useEffect(() => {
    if (message === "Product is deleted.") {
      navigate("/products");
      dispatch(productDetailSlice.actions.reset());
    }
  }, [dispatch, message, navigate]);
  useEffect(() => {
    dispatch(
      getProductApi(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      )
    );
  }, [dispatch, location.pathname]);
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
          <Loading />
        </div>
      )}
      <Link to="/products" className="text-pink-600 hover:text-pink-800">
        <i className="fas fa-arrow-left mr-2 mb-4"></i>
        Back to Products
      </Link>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-white shadow-md rounded-lg overflow-hidden lg:w-3/4">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Product Details
            </h2>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
              >
                <i className="fas fa-save mr-2"></i>Save
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
                  onClick={() => setIsDel(true)}
                >
                  <i className="fas fa-trash mr-2"></i> Delete
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                >
                  <i className="fas fa-edit mr-2"></i>Edit
                </button>
              </div>
            )}
          </div>
          <div className="p-6">
            <div
              className="flex flex-col lg:flex-row gap-6 overflow-auto"
              style={{ height: "calc(100vh - 270px)" }}
            >
              <ProductImage
                productId={product?.id}
                productImages={product?.images || []}
              />

              <div className="lg:w-2/3">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={productInfo?.name}
                      onChange={handleInputChange}
                      className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {productInfo?.name}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  {isEditing ? (
                    <select
                      name="category"
                      value={productInfo?.category}
                      onChange={handleInputChange}
                      className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category?.id} value={category?.id}>
                          {category?.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {
                        categories.find(
                          (category) => category?.id === productInfo?.category
                        )?.name
                      }
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Details
                  </label>
                  {isEditing ? (
                    <textarea
                      name="detail"
                      value={productInfo?.detail}
                      onChange={handleInputChange}
                      rows="4"
                      className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
                    ></textarea>
                  ) : (
                    <ul className="mt-1 text-sm text-gray-900">
                      {productInfo?.detail.split(". ").map((item, idx) => (
                        <li key={idx}>- {item}.</li>
                      ))}
                    </ul>
                  )}
                </div>
                <ProductVariants
                  productId={product?.id}
                  productDetail={product?.detail_products || []}
                />
              </div>
            </div>
          </div>
        </div>
        <Category />
        {isDel && (
          <NotifyModal
            closeModal={() => setIsDel(false)}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
