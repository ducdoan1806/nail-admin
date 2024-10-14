import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductApi } from "../features/products/api";
import { API_URL } from "../app/http";
import { convertToVND } from "../utils/util";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log("products: ", products);
  useEffect(() => {
    dispatch(getProductApi({ page: 1, pageSize: 10 }));
  }, [dispatch]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            autoFocus
            className="border rounded-md px-2 py-1 w-64 text-sm focus:border-gray-500 outline-none"
          />
          <button className="bg-pink-600 text-white text-sm py-2 px-4 rounded-md hover:bg-pink-700">
            <i className="fas fa-plus mr-2"></i> Add Product
          </button>
        </div>
        <div
          className="overflow-auto"
          style={{ height: "calc(100vh - 270px)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">No</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product?.id} className="border-b">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">
                    <Link
                      className="text-pink-600 underline hover:text-pink-800"
                      to={`/products/${product?.id}`}
                    >
                      {product?.name}
                    </Link>
                  </td>
                  <td className="p-2">
                    <img
                      src={`${API_URL}${product?.images[0]?.image}`}
                      alt={`Product ${product?.name}`}
                      className="rounded-md w-11 h-11"
                    />
                  </td>
                  <td className="p-2">{product?.category?.name}</td>
                  <td className="p-2">{convertToVND(product?.mini_price)}</td>
                  <td className="p-2">
                    {product?.detail_products?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </td>
                  <td className="p-2">
                    <button className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
