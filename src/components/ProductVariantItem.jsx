import PropTypes from "prop-types";
import { useState } from "react";
const ProductVariantItem = (props) => {
  const [variant, setVariant] = useState({
    color_code: props?.color_code ?? "",
    color_name: props?.color_name ?? "",
    price: props?.price ?? 0,
    quantity: props?.quantity ?? 0,
  });
  const handleDetailProductChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };
  const removeDetailProduct = () => {};
  return (
    <div className="mb-4 p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={variant.price}
            onChange={handleDetailProductChange}
            className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={variant.quantity}
            onChange={handleDetailProductChange}
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
            value={variant.color_code}
            onChange={handleDetailProductChange}
            className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color Name
          </label>

          <input
            type="text"
            name="color_name"
            value={variant.color_name}
            onChange={handleDetailProductChange}
            className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={removeDetailProduct}
            className="text-red-500 bg-white px-2 py-1 rounded"
          >
            <i className="fas fa-trash-alt mr-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
ProductVariantItem.propTypes = {
  color_code: PropTypes.string,
  color_name: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,
  quantity: PropTypes.number,
};
export default ProductVariantItem;
