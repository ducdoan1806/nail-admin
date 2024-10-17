import PropTypes from "prop-types";
const CategoryItem = ({ code, name }) => {
  return (
    <div className="px-5 py-2 flex justify-between gap-2 text-sm hover:bg-gray-50">
      <ul className="grid grid-cols-2 w-full ">
        <li>{code}</li>
        <li>{name}</li>
      </ul>
      <div>
        <button>
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </div>
  );
};
CategoryItem.propTypes = {
  id: PropTypes.number,
  code: PropTypes.string,
  name: PropTypes.string,
};
export default CategoryItem;
