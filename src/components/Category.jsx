import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import Loading from "./Loading";

const Category = () => {
  const { loading, categories } = useSelector((state) => state.category);
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-1/4">
      <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-sm">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div
        className="flex flex-col overflow-auto"
        style={{ maxHeight: "calc(-246px + 100vh)" }}
      >
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
