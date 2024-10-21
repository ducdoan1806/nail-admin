import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderDetailApi, updateOrderApi } from "../features/orders/api";
import { Link, useLocation } from "react-router-dom";
import { statusArr } from "../utils/const";
import { convertToVND } from "../utils/util";
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";
import NotifyTag from "../components/NotifyTag";
import orderSlice from "../features/orders/orderSlice";
const OrderDetail = () => {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.orderDetail);
  const { isError, message } = useSelector((state) => state.order);
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const totalAmount =
    order?.carts.reduce((sum, item) => sum + item.quantity * item.price, 0) ||
    0;
  const statusTag = statusArr.find(
    (item) => item.code.toUpperCase() === order?.status
  );
  const handleChangeStatus = (e) => {
    dispatch(updateOrderApi({ status: e.target.value, orderId: order?.id }));
    setIsEdit(false);
  };
  useEffect(() => {
    dispatch(
      getOrderDetailApi(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      )
    );
  }, [dispatch, location.pathname]);
  return (
    <>
      <div className="mb-4">
        <Link to="/orders" className="text-pink-600 hover:text-pink-800">
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Orders
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {message && (
          <NotifyTag
            isError={isError}
            content={message}
            onClose={() => {
              dispatch(orderSlice.actions.reset());
            }}
          />
        )}
        {/* Left side: Order Details */}
        <div className="md:w-1/2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Order #{order?.order_code}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Placed on {formatDate(order?.created_at)}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {!isEdit ? (
                      <span
                        className={
                          "px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full " +
                          statusTag?.style
                        }
                      >
                        {statusTag?.code}
                      </span>
                    ) : (
                      <select
                        className="outline-none px-2 py-1 border rounded border-gray-400"
                        value={order?.status}
                        onChange={handleChangeStatus}
                      >
                        {statusArr.map((item) => (
                          <option
                            key={item.code}
                            value={item.code.toUpperCase()}
                          >
                            {item.code}
                          </option>
                        ))}
                      </select>
                    )}

                    <button
                      className="ml-3 text-xs text-blue-400 font-semibold hover:text-blue-500"
                      onClick={() => setIsEdit(!isEdit)}
                    >
                      {!isEdit ? "Change Status" : "Cancel"}
                    </button>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Customer
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <p>{order?.name}</p>
                    <p>{order?.phone}</p>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Shipping Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <p>{order?.address}</p>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Payment Method
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {order?.payment_method === "cash"
                      ? "Cash on Delivery"
                      : order?.payment_method}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Note</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {order?.note || "No note provided"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Total Amount
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-pink-600 sm:mt-0 sm:col-span-2">
                    {convertToVND(totalAmount)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Right side: Order Items */}
        <div className="md:w-1/2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Order Items
              </h3>
            </div>
            <div className="border-t overflow-auto border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order?.carts.map((item) => (
                    <CartItem key={item?.product_detail} {...item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed bg-white bg-opacity-70 top-0 left-0 bottom-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default OrderDetail;
