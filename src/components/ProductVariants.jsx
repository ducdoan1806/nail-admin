import PropTypes from "prop-types";
import ProductVariantItem from "./ProductVariantItem";
import { useState } from "react";
const ProductVariants = ({ productDetail, productId }) => {
  const [isAddVariant, setIsAddVariant] = useState(false);
  const [variant, setVariant] = useState({
    product: productId,
    colorCode: "transparent",
    price: 0,
    quantity: 0,
  });
  const handleIsAddVariant = (e) => {
    e.preventDefault();
    setIsAddVariant(!isAddVariant);
    setVariant({
      colorCode: "transparent",
      price: 0,
      quantity: 0,
    });
  };
  const handleDetailProductChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
        Product Variants
        <button
          onClick={handleIsAddVariant}
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-sm"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </h3>
      {isAddVariant && (
        <div className="mb-4 p-4 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={variant.price}
                placeholder="price"
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
                placeholder="quantity"
                value={variant.quantity}
                onChange={handleDetailProductChange}
                className="block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="colorCode"
                className="block text-sm font-medium text-gray-700"
              >
                Color Code
              </label>
              <input
                id="colorCode"
                type="color"
                name="colorCode"
                placeholder="Color code"
                value={
                  variant.colorCode === "transparent"
                    ? "#ffffff"
                    : variant.colorCode
                }
                onChange={handleDetailProductChange}
                className="w-full bg-gray-100 border-gray-100 outline-none rounded-md mt-1 h-10 focus:border-pink-600 border text-sm"
              />
            </div>

            <div className="flex items-end justify-end">
              <button
                onClick={() => {}}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
              >
                <i className="fas fa-save mr-2"></i>Save
              </button>
            </div>
          </div>
        </div>
      )}
      {productDetail.map((detail) => (
        <ProductVariantItem key={detail?.id} {...detail} />
      ))}
    </div>
  );
};
ProductVariants.propTypes = {
  productId: PropTypes.number,
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
