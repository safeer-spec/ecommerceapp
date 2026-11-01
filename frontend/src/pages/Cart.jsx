import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem.jsx";
import { placeOrder } from "../redux/thunks/orderThunks.js";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { message, error } = useSelector((state) => state.orders);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const hasFrontendOnlyProducts = items.some((item) => !item._id);

  return (
    <div>
      <h2 className="mb-3">Your Cart</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table align-middle">
            <thead>
              <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((item) => <CartItem key={item._id ?? item.id} item={item} />)}
            </tbody>
          </table>
          <h4>Total: ${total}</h4>
          {hasFrontendOnlyProducts && (
            <p className="text-muted">
              Frontend sample products can be added to the cart, but must be saved
              in the backend before they can be ordered.
            </p>
          )}
          <button
            className="btn btn-success"
            disabled={hasFrontendOnlyProducts}
            onClick={() => dispatch(placeOrder(items))}
          >
            Place order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
