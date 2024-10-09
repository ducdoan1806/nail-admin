import { useDispatch, useSelector } from "react-redux";
import {
  convertToVietnamTime,
  convertToVND,
  useDebounced,
} from "../utils/util";
import orderSlice from "../features/orders/orderSlice";
import { getOrderApi } from "../features/orders/api";
import { useEffect } from "react";
import { statusArr } from "../utils/const";

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, orders, count, page, pageSize, name, status } = useSelector(
    (state) => state.order
  );
  const debouncedSearch = useDebounced((query) => {
    dispatch(orderSlice.actions.setSearchQuery({ name: query, status }));
  }, 500);
  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };
  const handleStatus = (e) => {
    dispatch(
      orderSlice.actions.setSearchQuery({ name, status: e.target.value })
    );
  };
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight <= scrollTop + clientHeight && count > orders?.length) {
      if (!loading) {
        dispatch(
          orderSlice.actions.updatePagination({
            page: page + 1,
            pageSize,
          })
        );
        dispatch(getOrderApi({ page: page + 1, pageSize, name, status }));
      }
    }
  };

  useEffect(() => {
    if (page === 1) dispatch(getOrderApi({ page, pageSize, name, status }));
  }, [dispatch, page, pageSize, name, status]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="border rounded-md p-2 w-64"
            onChange={handleSearch}
            autoFocus
          />
          <div>
            <select
              className="border rounded-md p-2 mr-2"
              onChange={handleStatus}
              value={status}
            >
              <option value="">All Statuses</option>
              {statusArr.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code}
                </option>
              ))}
            </select>
            <button className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700">
              <i className="fas fa-filter mr-2"></i> Filter
            </button>
          </div>
        </div>
        <div
          className="overflow-auto"
          style={{ height: "calc(100vh - 270px)" }}
          onScroll={handleScroll}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">No</th>
                <th className="text-left p-2">Order ID</th>
                <th className="text-left p-2">Customer</th>
                <th className="text-left p-2">Date Time</th>
                <th className="text-left p-2">Total</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => {
                const statusTag = statusArr.find(
                  (item) => order?.status === item.code
                );
                return (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2">#{order?.order_code}</td>
                    <td className="p-2">{order?.name}</td>
                    <td className="p-2">
                      {convertToVietnamTime(order?.created_at)}
                    </td>
                    <td className="p-2">
                      {convertToVND(
                        order.carts.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                      )}
                    </td>
                    <td className="p-2">
                      <span
                        className={
                          statusTag.style +
                          " py-1 px-3 rounded-full text-xs inline-block"
                        }
                      >
                        {statusTag.code}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="text-green-600 hover:text-green-800">
                        <i className="fas fa-check"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
