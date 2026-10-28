import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProductById, fetchRecommendations } from "../redux/thunks/productThunks.js";
import { addToCart } from "../redux/thunks/cartThunks.js";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, recommendations } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchRecommendations(id));
  }, [dispatch, id]);

  if (!selected) return <p>Loading...</p>;

  return (
    <div>
      <div className="row mb-5">
        <div className="col-md-5">
          {selected.image && <img src={selected.image} className="img-fluid rounded" alt={selected.name} />}
        </div>
        <div className="col-md-7">
          <h2>{selected.name}</h2>
          <p className="text-muted">{selected.category}</p>
          <p>{selected.description}</p>
          <h4>${selected.price}</h4>
          <p>In stock: {selected.stock}</p>
          <button className="btn btn-primary" onClick={() => dispatch(addToCart(selected._id))}>
            Add to cart
          </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <>
          <h4 className="mb-3">You may also like</h4>
          <div className="row g-3">
            {recommendations.map((p) => (
              <div className="col-sm-6 col-md-3" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
