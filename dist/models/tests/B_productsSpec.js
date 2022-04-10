"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('Products route test', () => {
    it('get the authenticate endpoint and create a product', async () => {
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        const res = await request
            .post('/products/add')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            id: 1,
            name: "lemon",
            price: 5.7
        });
        expect(res.body.name).toEqual("lemon");
        expect(Number(res.body.price)).toEqual(5.7);
    });
    it('get the index endpoint of prodcuts', async () => {
        const response = await request.get('/products');
        expect(response.body[0].name).toContain('lemon');
    });
    it('get the show endpoint of prodcuts to show first product', async () => {
        const response = await request.get('/products/1');
        expect(response.body.name).toEqual("lemon");
        expect(Number(response.body.price)).toEqual(5.7);
    });
});
