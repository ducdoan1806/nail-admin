import { useDispatch, useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import Loading from "./Loading";
import { useState } from "react";
import { createCategoryApi } from "../features/categories/api";
import NotifyTag from "./NotifyTag";
import categorySlice from "../features/categories/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const { loading, categories, count, message, isError } = useSelector(
    (state) => state.category
  );

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ code: "", name: "" });
  const handleNewCategory = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };
  const handleCreateCategory = (e) => {
    e.preventDefault();
    dispatch(createCategoryApi(newCategory));
    setIsNewCategory(false);
    setNewCategory({ code: "", name: "" });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-1/4">
      {message && (
        <NotifyTag
          content={message}
          isError={isError}
          onClose={() => {
            dispatch(categorySlice.actions.resetError());
          }}
        />
      )}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          Categories ({count ?? 0})
        </h2>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-sm"
            onClick={() => setIsNewCategory(!isNewCategory)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div
        className="flex flex-col overflow-auto px-4 py-3 gap-3"
        style={{ maxHeight: "calc(-246px + 100vh)" }}
      >
        {isNewCategory && (
          <form
            className="flex justify-between gap-2 text-sm"
            onSubmit={handleCreateCategory}
          >
            <div className="grid grid-cols-2 gap-2 w-full ">
              <input
                className="border-gray-100 disabled:bg-transparent outline-none border bg-gray-100 border-transparent px-2 py-1 rounded focus:border-pink-600"
                type="text"
                name="code"
                value={newCategory?.code}
                onChange={handleNewCategory}
                placeholder="Type code..."
              />

              <input
                className="border-gray-100 disabled:bg-transparent outline-none border bg-gray-100 border-transparent px-2 py-1 rounded focus:border-pink-600"
                type="text"
                name="name"
                value={newCategory?.name}
                placeholder="Type name..."
                onChange={handleNewCategory}
              />
            </div>
            <div className="flex gap-4">
              <button className="text-red-500" type="submit">
                <i className="fas fa-check"></i>
              </button>
              <button
                className="text-blue-500"
                type="button"
                onClick={() => setIsNewCategory(!isNewCategory)}
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>
          </form>
        )}
        {categories.length ? (
          categories.map((category) => (
            <CategoryItem key={category?.id} {...category} />
          ))
        ) : (
          <p className="p-4 text-center text-sm">No category found</p>
        )}
        {loading && (
          <div className="p-4 flex items-center justify-center">
            <Loading size={7} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
