function Products() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-md p-2 w-64"
          />
          <button className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700">
            <i className="fas fa-plus mr-2"></i> Add Product
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Image</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Stock</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((product) => (
              <tr key={product} className="border-b">
                <td className="p-2">
                  <img
                    src={`https://via.placeholder.com/50x50?text=Product ${product}`}
                    alt={`Product ${product}`}
                    className="rounded-md"
                  />
                </td>
                <td className="p-2">Nail Polish Set {product}</td>
                <td className="p-2">${(Math.random() * 50).toFixed(2)}</td>
                <td className="p-2">{Math.floor(Math.random() * 100)}</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
