import { useDispatch } from "react-redux";
import { removeFromCart, changeQuantity } from "../redux/slices/cartSlice.js";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const itemId = item._id ?? item.id;

  return (
    <tr>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td>
        <input
          type="number"
          min="1"
          className="form-control form-control-sm"
          style={{ width: 70 }}
          value={item.quantity}
          onChange={(e) => dispatch(changeQuantity({ id: itemId, quantity: Number(e.target.value) }))}
        />
      </td>
      <td>${item.price * item.quantity}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(itemId))}>
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
