import PropTypes from "prop-types";

const NotifyModal = ({ closeModal, handleDelete }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <i className="fa-solid fa-triangle-exclamation text-yellow-600 text-2xl"></i>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
            Confirm Deletion
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-24 mr-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
NotifyModal.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
};
export default NotifyModal;
