import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    region: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Completed',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
