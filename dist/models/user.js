"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
class UserTable {
    async authenticate(username, user_password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const userPassword = result.rows[0];
                if (bcrypt_1.default.compareSync(user_password + pepper, userPassword.password)) {
                    return userPassword.password;
                }
            }
            return null;
        }
        catch (error) {
            throw new Error(`Cannot authenticate user ${error}`);
        }
    }
    //index all users
    async index() {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }
    ;
    //show a specific user
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find user ${id}. Error: ${error}`);
        }
    }
    ;
    //create new user 
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create user (${u.username}) : ${error}`);
        }
    }
    ;
}
exports.UserTable = UserTable;
