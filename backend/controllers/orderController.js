// Manages order placement, updates, and tracking
import Order from "../models/order.js";
import Product from "../models/product.js";

// POST /api/orders   body: { items: [{ product: id, quantity: n }] }
export const placeOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    let totalPrice = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: "Product not found" });
      totalPrice += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }
    const order = await Order.create({ user: req.user._id, items: orderItems, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// Orders of the logged-in user
export const getMyOrders = async (req, res, next) => {
  try {
    res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
};

// Admin: update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};
