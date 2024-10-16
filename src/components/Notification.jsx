import PropTypes from "prop-types";
const Notification = ({ content, isError }) => {
  return (
    <div
      className={`flex items-center justify-between mb-4 rounded px-2 py-1 border ${
        isError
          ? "bg-red-200 text-red-700 border-red-300"
          : "bg-green-200 text-green-700 border-green-300"
      }`}
    >
      <p className="text-sm">{content}</p>
      <button type="button">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};
Notification.propTypes = {
  content: PropTypes.string,
  isError: PropTypes.bool,
};
export default Notification;
