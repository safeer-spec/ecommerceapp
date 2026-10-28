import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/thunks/cartThunks.js";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card h-100">
      {product.image && <img src={product.image} className="card-img-top product-img" alt={product.name} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.category}</p>
        <p className="fw-bold mt-auto">${product.price}</p>
        <div className="d-flex gap-2">
          <Link to={`/product/${product._id}`} className="btn btn-outline-secondary btn-sm">Details</Link>
          <button className="btn btn-primary btn-sm" onClick={() => dispatch(addToCart(product._id))}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
