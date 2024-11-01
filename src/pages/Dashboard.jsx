import { useEffect, useState } from "react";
import http from "../app/http";
import { convertToVietnamTime, convertToVND, getCookie } from "../utils/util";
import { Link } from "react-router-dom";
import { statusArr } from "../utils/const";
import Loading from "../components/Loading";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState({
    orderCount: 0,
    completedOrderCount: 0,
    totalRevenue: 0,
    productCount: 0,
  });

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const token = getCookie("authToken");
      const res = await http.get(`/nail/overview/`, {
        headers: { Authorization: token },
      });
      setOrders(res.data.data?.recent_order);
      setOverview({
        orderCount: res.data.data?.order_count,
        completedOrderCount: res.data.data?.completed_order_count,
        totalRevenue: res.data.data?.total_revenue,
        productCount: res.data.data?.product_count,
      });
      setLoading(false);
    };
    getOrders();
  }, []);
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
          <Loading />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-pink-600">
            {convertToVND(overview?.totalRevenue)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Order Completed</h3>
          <p className="text-3xl font-bold text-pink-600">
            {overview?.completedOrderCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-pink-600">
            {overview?.orderCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-3xl font-bold text-pink-600">
            {overview?.productCount.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-auto">
          {orders && orders?.length ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 text-nowrap">No</th>
                  <th className="text-left p-2 text-nowrap">Order ID</th>
                  <th className="text-left p-2 text-nowrap">Customer</th>
                  <th className="text-left p-2 text-nowrap">Date Time</th>
                  <th className="text-left p-2 text-nowrap">Total</th>
                  <th className="text-left p-2 text-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => {
                  const statusTag = statusArr.find(
                    (item) => order?.status === item.code.toUpperCase()
                  );
                  return (
                    <tr key={idx} className="border-b">
                      <td className="p-2 text-nowrap">{idx + 1}</td>
                      <td className="p-2 text-nowrap">
                        <Link
                          className="text-pink-600 underline hover:text-pink-800"
                          to={`/orders/${order?.order_code}`}
                        >
                          #{order?.order_code}
                        </Link>
                      </td>
                      <td className="p-2 text-nowrap">{order?.name}</td>
                      <td className="p-2 text-nowrap">
                        {convertToVietnamTime(order?.created_at)}
                      </td>
                      <td className="p-2 text-nowrap">
                        {convertToVND(
                          order.carts.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                        )}
                      </td>
                      <td className="p-2 text-nowrap">
                        <span
                          className={
                            statusTag.style +
                            " py-1 px-3 rounded-full text-xs inline-block"
                          }
                        >
                          {statusTag.code}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No order found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
