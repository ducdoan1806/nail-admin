import { updateProductDetailApi } from "../features/products/api";
import PropTypes from "prop-types";
const ProductVariants = ({ productDetail }) => {
  const handleDetailProductChange = (index, e) => {
    const { name, value } = e.target;
    updateProductDetailApi((prevProduct) => ({
      ...prevProduct,
      detail_products: prevProduct.detail_products.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]:
                name === "quantity" || name === "price"
                  ? parseInt(value, 10)
                  : value,
            }
          : item
      ),
    }));
  };

  const addDetailProduct = () => {
    updateProductDetailApi();
  };

  const removeDetailProduct = (index) => {
    updateProductDetailApi((prevProduct) => ({
      ...prevProduct,
      detail_products: prevProduct.detail_products.filter(
        (_, i) => i !== index
      ),
    }));
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
      {productDetail.map((detail, index) => (
        <div key={detail.id} className="mb-4 p-4 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={detail.price}
                onChange={(e) => handleDetailProductChange(index, e)}
                className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
              />
            </div>
            {/* Other fields like color_code, color_name, and quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={(e) => handleDetailProductChange(index, e)}
                className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color Code
              </label>

              <input
                type="text"
                name="color_code"
                value={detail.color_code}
                onChange={(e) => handleDetailProductChange(index, e)}
                className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={() => removeDetailProduct(index)}
                className="text-red-500 bg-white px-2 py-1 rounded"
              >
                <i className="fas fa-trash-alt mr-1"></i>
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addDetailProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
      >
        <i className="fas fa-plus mr-2"></i>Add Variant
      </button>
    </div>
  );
};
ProductVariants.propTypes = {
  productDetail: PropTypes.arrayOf(
    PropTypes.shape({
      color_code: PropTypes.string,
      color_name: PropTypes.string,
      id: PropTypes.number,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
};
export default ProductVariants;
