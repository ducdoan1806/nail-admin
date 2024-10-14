import { API_URL } from "../app/http";
import { updateProductDetailApi } from "../features/products/api";
import PropTypes from "prop-types";
const ProductImage = ({ productImages }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProductDetailApi((prevProduct) => ({
          ...prevProduct,
          images: [
            ...prevProduct.images,
            {
              id: Date.now(),
              image: reader.result,
              created_at: new Date().toISOString(),
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (id) => {
    updateProductDetailApi((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((img) => img.id !== id),
    }));
  };
  return (
    <div className="lg:w-1/3">
      <h3 className="text-lg font-semibold mb-4">Product Images</h3>
      <div className="flex flex-wrap gap-4">
        {productImages.map((image) => (
          <div
            key={image.id}
            className="relative w-32 h-32 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={API_URL + image.image}
              alt={image.image}
              className="w-full h-full"
            />

            <button
              onClick={() => removeImage(image.id)}
              className="absolute top-2 right-2 w-7 h-7 text-xs bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Add Image
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="mt-1 block w-full"
        />
      </div>
    </div>
  );
};
ProductImage.propTypes = {
  productImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    })
  ),
};
export default ProductImage;
