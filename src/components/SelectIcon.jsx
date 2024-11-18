import { useRef, useState } from "react";
import { useOutside } from "../utils/util";
import PropTypes from "prop-types";
import { socials } from "../utils/const";

// Dữ liệu các tùy chọn với social và nhãn

const IconSelect = ({
  selectedOption,
  setSelectedOption,
  options,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  useOutside(ref, () => {
    setIsOpen(false);
  });
  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="h-full focus:border-pink-600 max-w-[56px] min-w-[56px] p-2 text-lg font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg flex items-center gap-2"
      >
        <div className="flex items-center">
          <i
            className={`${
              socials.find((item) => item?.name === selectedOption)?.icon
            }`}
          ></i>
        </div>
        <i className="fas fa-chevron-down text-xs"></i>
      </button>

      {isOpen && (
        <div
          className=" z-20 absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg overflow-hidden"
          ref={ref}
        >
          {options.map((option) => (
            <button
              key={option?.name}
              onClick={() => handleSelect(option?.name)}
              className="w-full p-2 text-gray-700 hover:bg-gray-100"
            >
              <i className={`${option?.icon}`}></i>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
IconSelect.propTypes = {
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};
export default IconSelect;
