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
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, orders, count, page, pageSize, search, status } =
    useSelector((state) => state.order);
  const debouncedSearch = useDebounced((query) => {
    dispatch(orderSlice.actions.setSearchQuery({ search: query, status }));
  }, 500);
  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };
  const handleStatus = (e) => {
    dispatch(
      orderSlice.actions.setSearchQuery({ search, status: e.target.value })
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
        dispatch(getOrderApi({ page: page + 1, pageSize, search, status }));
      }
    }
  };

  useEffect(() => {
    if (page === 1) dispatch(getOrderApi({ page, pageSize, search, status }));
  }, [dispatch, page, pageSize, search, status]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="border rounded-md px-2 py-1 w-64 text-sm focus:border-gray-600 outline-none"
            onChange={handleSearch}
            autoFocus
          />
          <div>
            <select
              className="border rounded-md px-2 py-1 text-sm focus:border-gray-600 outline-none"
              onChange={handleStatus}
              value={status}
            >
              <option value="">All Statuses</option>
              {statusArr.map((item) => (
                <option key={item.code} value={item.code.toUpperCase()}>
                  {item.code}
                </option>
              ))}
            </select>
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
          {loading && (
            <div className="mt-4 flex justify-center">
              <Loading size="w-8 h-8" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
