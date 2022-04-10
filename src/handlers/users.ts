import express, { Request, Response } from 'express';
import { User, UserTable } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const {
    TOKEN_SECRET
} = process.env

const usertable = new UserTable();

// //index route
const index = async (_req: Request, res: Response) => {
    try {
        const users = await usertable.index();
        res.json(users);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

};

//show route
const show = async (req: Request, res: Response) => {
    try {
        const user = await usertable.show(parseInt(req.params.id));
        res.json(user);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
};

//create new user route
const create = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const newUser = await usertable.create(user);
        res.json(newUser);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

//authenticate user
const authenticate = async (req: Request, res: Response) => {
    try {
        const u = await usertable.authenticate(req.body.username, req.body.password);
        let token = jwt.sign({ user: req.body.username }, process.env.TOKEN_SECRET as Secret);
        res.json(token)
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
};

//verifyAuthToken
const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
        next()
    } catch (error) {
        res.status(401)
    }
};

//verifyAuthToken
const user_routes = (app: express.Application) => {
    app.post('/users/verify', authenticate);
    app.post('/users/add', create);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);

};

export default user_routes;

