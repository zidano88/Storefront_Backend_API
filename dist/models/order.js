"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTable = void 0;
const database_1 = __importDefault(require("../database"));
class OrderTable {
    //add a new product
    async createOrder(userId) {
        try {
            const status = 'preparing';
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [status, userId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (error) {
            throw new Error(`Could not add order with user ID: ${userId}: ${error}`);
        }
    }
    ;
    //show orders from user
    async showActiveOrders(userId) {
        try {
            const sql = `SELECT * FROM orders WHERE (user_id=($1) AND status='preparing')`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not find user ${userId}. Error: ${error}`);
        }
    }
    ;
    //Add products to orders
    async addOrderProducts(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO orderproducts (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const orderProdcut = result.rows[0];
            conn.release();
            return orderProdcut;
        }
        catch (error) {
            throw new Error(`Could not add prodcut ${productId} to order ${orderId}. Error: ${error}`);
        }
    }
    //Show products of an order
    async showOrderProducts(orderId) {
        try {
            const sql = `SELECT * FROM orderproducts WHERE order_id=($1)`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not find prodcuts with order Id: ${orderId}. Error: ${error}`);
        }
    }
}
exports.OrderTable = OrderTable;
;
