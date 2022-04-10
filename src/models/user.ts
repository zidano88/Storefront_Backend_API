import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

const pepper: string = BCRYPT_PASSWORD as string;
const saltRounds: string = SALT_ROUNDS as string;

export type User = {
    firstname: string,
    lastname: string,
    username: string,
    password: string;
};


export class UserTable {

    async authenticate(username: string, user_password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const userPassword = result.rows[0];
                if (bcrypt.compareSync(user_password + pepper, userPassword.password)) {
                    return userPassword.password;
                }
            }
            return null;
        } catch (error) {
            throw new Error(`Cannot authenticate user ${error}`);
        }
    }

    //index all users
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    };

    //show a specific user
    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find user ${id}. Error: ${error}`);
        }
    };

    //create new user 
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create user (${u.username}) : ${error}`);
        }
    };
}