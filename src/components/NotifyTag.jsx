import PropTypes from "prop-types";
import { useEffect } from "react";
const NotifyTag = ({ content, isError, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 5000);
  }, [onClose]);
  return (
    <div
      className={`fixed top-16 right-0 w-96 shadow-md flex items-center justify-between rounded p-2 border z-20 ${
        isError
          ? "bg-red-200 text-red-700 border-red-300"
          : "bg-green-200 text-green-700 border-green-300"
      }`}
    >
      <p className="text-sm">
        {!isError ? (
          <i className="fa-solid fa-circle-info mr-2 text-base"></i>
        ) : (
          <i className="fa-solid fa-triangle-exclamation mr-2 text-base"></i>
        )}
        {content}
      </p>
      <button type="button" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};
NotifyTag.propTypes = {
  content: PropTypes.string,
  isError: PropTypes.bool,
  onClose: PropTypes.func,
};
export default NotifyTag;
