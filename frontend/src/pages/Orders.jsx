import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../redux/thunks/orderThunks.js";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div>
      <h2 className="mb-3">My Orders</h2>
      {orders.length === 0 && <p>You have no orders yet.</p>}
      {orders.map((order) => (
        <div className="card mb-3" key={order._id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <strong>Order #{order._id.slice(-6)}</strong>
              <span className="badge bg-secondary">{order.status}</span>
            </div>
            <ul className="mt-2 mb-2">
              {order.items.map((i) => (
                <li key={i._id}>{i.name} x {i.quantity}</li>
              ))}
            </ul>
            <div>Total: ${order.totalPrice}</div>
            <small className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
