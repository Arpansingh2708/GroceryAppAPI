import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
  groceryItemId: {
    type: Schema.Types.ObjectId,
    ref: "GroceryItem",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema({
  userId: { type: String, required: true }, // This could be changed to a User model reference
  items: [OrderItemSchema],
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
