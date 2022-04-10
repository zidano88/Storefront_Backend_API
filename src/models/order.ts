import Client from '../database';

export type Order = {
    id: number,
    status: string,
    user_id: number
}

export type OrderProduct = {
    id: number,
    quantity: number,
    order_id: number,
    product_id: number
}

export class OrderTable {

    //add a new product
    async createOrder(userId: number): Promise<Order> {
        try {
            const status: string = 'preparing';
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [status, userId]);
            const order: Order = result.rows[0];
            conn.release();
            return order;
        } catch (error) {
            throw new Error(`Could not add order with user ID: ${userId}: ${error}`);
        }
    };

    //show orders from user
    async showActiveOrders(userId: number): Promise<Order[]> {
        try {
            const sql = `SELECT * FROM orders WHERE (user_id=($1) AND status='preparing')`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not find user ${userId}. Error: ${error}`);
        }
    };

    //Add products to orders
    async addOrderProducts(quantity: number, orderId: number, productId: number): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO orderproducts (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const orderProdcut: OrderProduct = result.rows[0];
            conn.release();
            return orderProdcut;
        } catch (error) {
            throw new Error(`Could not add prodcut ${productId} to order ${orderId}. Error: ${error}`);
        }
    }

    //Show products of an order
    async showOrderProducts(orderId: number): Promise<OrderProduct[]> {
        try {
            const sql = `SELECT * FROM orderproducts WHERE order_id=($1)`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not find prodcuts with order Id: ${orderId}. Error: ${error}`);
        }
    }
};
