import PropTypes from "prop-types";
import { useState } from "react";
const CategoryItem = ({ code, name }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleIsEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };
  const handleIsDelete = (e) => {
    e.preventDefault();
    setIsDelete(!isDelete);
  };
  return (
    <div>
      <div className="px-5 py-3 flex justify-between gap-2 text-sm hover:bg-gray-50">
        <ul className="grid grid-cols-2 w-full ">
          <li>{code}</li>
          <li>{name}</li>
        </ul>
        {isEdit ? (
          <div className="flex gap-4">
            <button className="text-red-500">
              <i className="fas fa-check"></i>
            </button>
            <button className="text-blue-500" onClick={handleIsEdit}>
              <i className="fas fa-xmark"></i>
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button className="text-blue-500" onClick={handleIsEdit}>
              <i className="fas fa-pen"></i>
            </button>
            <button className="text-red-500" onClick={handleIsDelete}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      {isDelete && (
        <div className="px-5 py-3 bg-red-100 text-sm flex justify-between gap-4">
          <p>Do you want delete this category ?</p>
          <div className="flex  gap-3">
            <button
              className="text-blue-600 font-semibold"
              onClick={handleIsDelete}
            >
              Cancel
            </button>
            <button className="text-red-600 font-semibold">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
CategoryItem.propTypes = {
  id: PropTypes.number,
  code: PropTypes.string,
  name: PropTypes.string,
};
export default CategoryItem;
