import Client from '../database';

export type Product = {
    id: number,
    name: string,
    price: Number
}

export class ProdcutTable {

    //index all prodcuts
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    };

    //show a specific product
    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find book ${id}. Error: ${error}`);
        }
    };

    //create new product 
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create prodcuts (${p.name}) : ${error}`);
        }
    };

}

