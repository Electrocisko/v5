export default class Order {
  static get model() {
    return "orders";
  }

  static get schema() {
    return {
      orderNro: { type: Number, required: true, unique: true },
      timestamp: { type: Number },
      status: {
        type: String,
        enum: ["generated", "processed", "finished"],
        default: "generated",
      },
      items: [
        {
          name: String,
          quantity: Number,
        },
      ],
      buyerEmail: { type: String, required: true },
      buyerAddress: { type: String, required: true },
    };
  }
}
