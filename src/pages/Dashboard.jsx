function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-pink-600">$12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-pink-600">98</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-3xl font-bold text-pink-600">50</p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Total</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((order) => (
              <tr key={order} className="border-b">
                <td className="p-2">#{order.toString().padStart(4, "0")}</td>
                <td className="p-2">Customer {order}</td>
                <td className="p-2">${(Math.random() * 100).toFixed(2)}</td>
                <td className="p-2">
                  <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
