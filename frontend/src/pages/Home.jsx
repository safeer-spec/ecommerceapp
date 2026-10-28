import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../redux/thunks/productThunks.js";

function Home() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts(search));
  }, [dispatch, search]);

  return (
    <div>
      <h2 className="mb-3">Products</h2>
      <input
        className="form-control mb-4"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-3">
        {list.map((p) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {!loading && list.length === 0 && <p>No products found.</p>}
    </div>
  );
}

export default Home;
