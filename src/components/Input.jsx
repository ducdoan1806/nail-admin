import PropTypes from "prop-types";
const Input = ({
  id,
  name,
  type,
  autoComplete,
  required,
  value,
  onChange,
  title,
  autoFocus,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type || "text"}
          autoComplete={autoComplete || ""}
          required={required}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          placeholder={`Type your ${title.toLowerCase()} ...`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};
export default Input;
