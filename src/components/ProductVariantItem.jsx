import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProductVariantApi,
  updateProductDetailApi,
} from "../features/products/api";
const ProductVariantItem = (props) => {
  const dispatch = useDispatch();
  const [variant, setVariant] = useState({
    product: props?.product ?? 0,
    color_code: props?.color_code ?? "",
    price: props?.price ?? 0,
    quantity: props?.quantity ?? 0,
  });

  const [isEditVariant, setIsEditVariant] = useState(true);
  const [isDelVariant, setIsDelVariant] = useState(false);
  const handleDetailProductChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };
  const handleDelVariant = () => {
    setIsDelVariant(!isDelVariant);
    setIsEditVariant(true);
  };
  const removeDetailProduct = () => {
    dispatch(deleteProductVariantApi(props?.id));
    setIsEditVariant(!false);
  };
  const handleIsEditVariant = () => {
    setIsEditVariant(!isEditVariant);
    setIsDelVariant(false);
  };
  const handleEditVariant = () => {
    setIsEditVariant(true);
    dispatch(updateProductDetailApi(variant, props?.id));
  };
  return (
    <div className="mb-4">
      <div className="mb-2 p-4 border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={variant.price}
              onChange={handleDetailProductChange}
              disabled={isEditVariant}
              className="disabled:bg-white disabled:border-white block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
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
              disabled={isEditVariant}
              className="disabled:bg-white disabled:border-white block w-full bg-gray-100 border-gray-100 outline-none p-2 rounded-md mt-1 focus:border-pink-600 border text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>

            <input
              type="color"
              name="color_code"
              value={
                variant.color_code === "transparent"
                  ? "#ffffff"
                  : variant.color_code
              }
              onChange={handleDetailProductChange}
              disabled={isEditVariant}
              className="disabled:bg-white disabled:border-white w-full bg-gray-100 border-gray-100 outline-none rounded-md mt-1 h-10 focus:border-pink-600 border text-sm"
            />
          </div>
          {!isEditVariant ? (
            <div className="flex items-center justify-end gap-1">
              <button
                className="text-red-500 bg-white px-2 py-1 rounded-full hover:bg-gray-100"
                onClick={handleEditVariant}
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                className="text-blue-500 bg-white px-2 py-1 rounded-full hover:bg-gray-100"
                onClick={handleIsEditVariant}
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={handleIsEditVariant}
                className="text-blue-500 bg-white px-2 py-1 rounded-full hover:bg-gray-100"
              >
                <i className="fas fa-pen"></i>
              </button>
              <button
                onClick={handleDelVariant}
                className="text-red-500 bg-white px-2 py-1 rounded-full hover:bg-gray-100"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      {isDelVariant && (
        <div className="px-4 py-2 bg-red-100 border border-red-300 text-sm flex justify-between gap-4 rounded">
          <p>Do you want delete this product variant ?</p>
          <div className="flex gap-3">
            <button
              className="text-blue-600 font-semibold"
              onClick={() => {
                setIsDelVariant(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-red-600 font-semibold"
              onClick={removeDetailProduct}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
ProductVariantItem.propTypes = {
  color_code: PropTypes.string,
  color_name: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,
  quantity: PropTypes.number,
  product: PropTypes.number,
};
export default ProductVariantItem;
