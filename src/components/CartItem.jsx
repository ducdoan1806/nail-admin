import { useState } from "react";
import ImageModal from "./ImageModal";
import { convertToVND } from "../utils/util";
import PropTypes from "prop-types";

const CartItem = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={() => setIsModalOpen(true)}
          className="font-medium text-pink-600 hover:text-pink-700 hover:underline"
        >
          {props?.products.name}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          title={props?.detail.color_code}
          className="inline-block w-6 h-6 rounded-full border border-gray-300"
          style={{ background: props?.detail.color_code }}
        ></span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props?.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {convertToVND(props?.price)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {convertToVND(props?.quantity * props?.price)}
      </td>
      <ImageModal
        images={props.products.images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </tr>
  );
};
CartItem.propTypes = {
  products: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({ image: PropTypes.string })),
  }),
  detail: PropTypes.shape({
    color_name: PropTypes.string,
    color_code: PropTypes.string,
  }),
  quantity: PropTypes.number,
  price: PropTypes.number,
};
export default CartItem;
