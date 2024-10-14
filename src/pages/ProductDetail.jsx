import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState({
    id: 1,
    name: "Chic Nail Brush",
    detail: "Chic Nail Brush",
    description: "High-quality nail brush for professional and personal use",
    mini_price: 50000,
    category: {
      id: 1,
      name: "other",
      code: "other",
    },
    images: [
      {
        id: 1,
        image: "/media/uploads/images/picture1.jpg",
        created_at: "2024-10-04T07:53:23.219584Z",
      },
      {
        id: 2,
        image: "/media/uploads/images/picture2.jpg",
        created_at: "2024-10-04T07:53:23.219584Z",
      },
    ],
    detail_products: [
      {
        id: 6,
        price: 50000,
        color_code: "transparent",
        color_name: "transparent",
        quantity: 50,
      },
      {
        id: 7,
        price: 55000,
        color_code: "pink",
        color_name: "Pink",
        quantity: 30,
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDetailProductChange = (index, e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      detail_products: prevProduct.detail_products.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]:
                name === "quantity" || name === "price"
                  ? parseInt(value, 10)
                  : value,
            }
          : item
      ),
    }));
  };

  const addDetailProduct = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      detail_products: [
        ...prevProduct.detail_products,
        {
          id: Date.now(),
          price: 0,
          color_code: "",
          color_name: "",
          quantity: 0,
        },
      ],
    }));
  };

  const removeDetailProduct = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      detail_products: prevProduct.detail_products.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => ({
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
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((img) => img.id !== id),
    }));
  };

  const handleSave = () => {
    // Here you would typically send the updated product data to your backend
    console.log("Saving product:", product);
    setIsEditing(false);
  };

  return (
    <div>
      <Link to="/products" className="text-pink-600 hover:text-pink-800">
        <i className="fas fa-arrow-left mr-2 mb-4"></i>
        Back to Products
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <i className="fas fa-save mr-2"></i>Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                <i className="fas fa-edit mr-2"></i>Edit
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          <div
            className="flex flex-col lg:flex-row gap-6 overflow-auto"
            style={{ height: "calc(100vh - 270px)" }}
          >
            {/* Product Images on the Left */}
            <div className="lg:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Product Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
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
              )}
            </div>

            {/* Product Details on the Right */}
            <div className="lg:w-2/3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                {isEditing ? (
                  <select
                    name="category"
                    value={product.category.id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  >
                    <option value={1}>Other</option>
                    {/* Add more categories as needed */}
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {product.category.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  ></textarea>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Product Variants */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
                {product.detail_products.map((detail, index) => (
                  <div key={detail.id} className="mb-4 p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            name="price"
                            value={detail.price}
                            onChange={(e) =>
                              handleDetailProductChange(index, e)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">
                            {detail.price} VND
                          </p>
                        )}
                      </div>
                      {/* Other fields like color_code, color_name, and quantity */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            name="quantity"
                            value={detail.quantity}
                            onChange={(e) =>
                              handleDetailProductChange(index, e)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">
                            {detail.quantity}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Color Code
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="color_code"
                            value={detail.color_code}
                            onChange={(e) =>
                              handleDetailProductChange(index, e)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">
                            {detail.color_code}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeDetailProduct(index)}
                        className=" text-red-500 bg-white px-2 py-1 rounded"
                      >
                        <i className="fas fa-trash-alt mr-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addDetailProduct}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <i className="fas fa-plus mr-2"></i>Add Variant
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
