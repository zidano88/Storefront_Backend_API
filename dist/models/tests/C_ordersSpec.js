"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('Orders route test', () => {
    it('get the authenticate and addProduct endpoints orders', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //User creation testing
        const testorder = {
            userId: 1
        };
        const res = await request
            .post('/orders')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(testorder);
        expect(Number(res.body.user_id)).toEqual(1);
    });
    it('get the showActiveOrder endpoints of orders for user with id=1', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //show orders testing
        const res = await request.get('/orders/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.body[0].status).toEqual('preparing');
        expect(Number(res.body[0].user_id)).toEqual(1);
    });
    it('get the authenticate and addOrderProducts endpoints orders', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //User creation testing
        const testorderproduct = {
            quantity: 5,
            orderId: 1,
            productId: 1
        };
        const res = await request
            .post('/orders/products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(testorderproduct);
        expect(res.body.quantity).toEqual(5);
        expect(Number(res.body.order_id)).toEqual(1);
        expect(Number(res.body.product_id)).toEqual(1);
    });
    it('get the showOrderProducts endpoints of orderproducts for order with id=1', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //show orders testing
        const res = await request.get('/orders/products/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(Number(res.body[0].quantity)).toEqual(5);
        expect(Number(res.body[0].order_id)).toEqual(1);
        expect(Number(res.body[0].product_id)).toEqual(1);
    });
});
