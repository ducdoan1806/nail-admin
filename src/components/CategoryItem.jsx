import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategoryApi, deleteCategoryApi } from "../features/products/api";
const CategoryItem = ({ id, code, name }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: name || "",
    code: code || "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleCategory = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const handleIsEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };
  const saveCategory = (e) => {
    e.preventDefault();
    dispatch(updateCategoryApi(category, id));
    setIsEdit(false);
  };
  const handleIsDelete = (e) => {
    e.preventDefault();
    setIsDelete(!isDelete);
  };
  const deleteCategory = (e) => {
    e.preventDefault();
    dispatch(deleteCategoryApi(id));
    setIsDelete(false);
  };
  return (
    <div>
      <div className="flex justify-between gap-2 text-sm">
        <div className="grid grid-cols-2 gap-2 w-full ">
          <input
            className={`disabled:bg-transparent outline-none border border-transparent bg-gray-100 px-2 py-1 rounded focus:border-pink-600 ${
              isEdit ? "border-gray-100" : ""
            }`}
            type="text"
            name="code"
            disabled={!isEdit}
            value={category?.code}
            onChange={handleCategory}
            placeholder="Type code..."
          />

          <input
            className={`disabled:bg-transparent outline-none border bg-gray-100 border-transparent px-2 py-1 rounded focus:border-pink-600 ${
              isEdit ? "border-gray-100" : ""
            }`}
            type="text"
            name="name"
            disabled={!isEdit}
            value={category?.name}
            placeholder="Type name..."
            onChange={handleCategory}
          />
        </div>
        {isEdit ? (
          <div className="flex gap-4">
            <button className="text-red-500" onClick={saveCategory}>
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
        <div className="px-4 py-2 bg-red-100 text-sm flex justify-between gap-4 rounded mt-1">
          <p>Do you want delete this category ?</p>
          <div className="flex  gap-3">
            <button
              className="text-blue-600 font-semibold"
              onClick={handleIsDelete}
            >
              Cancel
            </button>
            <button
              onClick={deleteCategory}
              className="text-red-600 font-semibold"
            >
              Delete
            </button>
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
