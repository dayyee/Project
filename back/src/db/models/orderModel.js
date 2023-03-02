const { model } = require("mongoose");
const { OrderSchema } = require("../schemas/orderSchema");

const Order = model("orders", OrderSchema);

class OrderModel {
  async findCountDocument() {
    const countDocument = await Order.countDocuments({});
    return countDocument;
  }

  async findAllPagination(page, perPage) {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return orders;
  }
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  async findAllByUserId(userId) {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return orders;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const validation = await Order.findOne({ _id: filter });

    if (validation.status === "상품 배송중") {
      throw new Error("상품 배송 중이므로 정보를 변경할 수 없습니다.");
    }
    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }
  async updateAdmin({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  async deleteById(orderId) {
    const validation = await Order.findOne({ _id: orderId });

    if (validation.status === "상품 배송중") {
      throw new Error("상품 배송 중이므로 주문을 취소할 수 없습니다.");
    }

    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }

  async deleteByIdAdmin(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }
}

module.exports = OrderModel;

const orderModel = new OrderModel();

module.exports = { orderModel };
