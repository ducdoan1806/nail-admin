function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="border rounded-md p-2 w-64"
          />
          <div>
            <select className="border rounded-md p-2 mr-2">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <button className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700">
              <i className="fas fa-filter mr-2"></i> Filter
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Total</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((order) => (
              <tr key={order} className="border-b">
                <td className="p-2">#{order.toString().padStart(4, "0")}</td>
                <td className="p-2">Customer {order}</td>
                <td className="p-2">
                  2024-03-{order.toString().padStart(2, "0")}
                </td>
                <td className="p-2">${(Math.random() * 100).toFixed(2)}</td>
                <td className="p-2">
                  <span className="bg-yellow-200 text-yellow-800 py-1 px-2 rounded-full text-xs">
                    Processing
                  </span>
                </td>
                <td className="p-2">
                  <button className="text-blue-600 hover:text-blue-800 mr-4">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <i className="fas fa-check"></i>
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

export default Orders;
