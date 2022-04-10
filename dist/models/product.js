"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdcutTable = void 0;
const database_1 = __importDefault(require("../database"));
class ProdcutTable {
    //index all prodcuts
    async index() {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }
    ;
    //show a specific product
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find book ${id}. Error: ${error}`);
        }
    }
    ;
    //create new product 
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create prodcuts (${p.name}) : ${error}`);
        }
    }
    ;
}
exports.ProdcutTable = ProdcutTable;
