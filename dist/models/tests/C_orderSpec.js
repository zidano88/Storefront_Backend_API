"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const ordertable = new order_1.OrderTable();
describe('Order Test', () => {
    it('should have an createOrder method', () => {
        expect(ordertable.createOrder).toBeDefined();
    });
    it('should have an show orders method', () => {
        expect(ordertable.showActiveOrders).toBeDefined();
    });
    it('should have an addOrderProducts method', () => {
        expect(ordertable.addOrderProducts).toBeDefined();
    });
    it('should have an showOrderProducts method', () => {
        expect(ordertable.showOrderProducts).toBeDefined();
    });
    it('createOrder method should add an order', async () => {
        const testUserId = 1;
        const result = await ordertable.createOrder(testUserId);
        expect(result.status).toEqual('preparing');
        expect(Number(result.user_id)).toEqual(1);
    });
    it('showActiveOrders method should return list of orders by user with id=1', async () => {
        const result = await ordertable.showActiveOrders(1);
        expect(Number(result[0].id)).toEqual(1);
        expect(result[0].status).toEqual("preparing");
        expect(Number(result[0].user_id)).toEqual(1);
    });
    it('addOrderProducts method should add a product to an order in orderproducts table', async () => {
        const quantity = 5;
        const orderId = 1;
        const productId = 1;
        const result = await ordertable.addOrderProducts(quantity, orderId, productId);
        expect(Number(result.quantity)).toEqual(5);
        expect(Number(result.order_id)).toEqual(1);
        expect(Number(result.product_id)).toEqual(1);
    });
    it('showOrderProducts method should return list of products listed in an order with id=1', async () => {
        const result = await ordertable.showOrderProducts(1);
        expect(Number(result[0].quantity)).toEqual(5);
        expect(Number(result[0].order_id)).toEqual(1);
        expect(Number(result[0].product_id)).toEqual(1);
    });
});
