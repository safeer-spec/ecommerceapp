// Handles product recommendation logic (RapidMiner integration)
import Product from "../models/product.js";
import Order from "../models/order.js";

// GET /api/analytics/recommendations/:productId
// Simple version: products from the same category.
// RapidMiner: build your model there, export the results (e.g. a CSV or JSON
// of "product -> recommended products") and read that file here instead.
export const getRecommendations = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const recommended = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);
    res.json(recommended);
  } catch (error) {
    next(error);
  }
};

// GET /api/analytics/popular  - most ordered products
export const getPopularProducts = async (req, res, next) => {
  try {
    const popular = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", name: { $first: "$items.name" }, sold: { $sum: "$items.quantity" } } },
      { $sort: { sold: -1 } },
      { $limit: 5 },
    ]);
    res.json(popular);
  } catch (error) {
    next(error);
  }
};
