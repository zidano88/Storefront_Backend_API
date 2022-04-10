"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const usertable = new user_1.UserTable();
// //index route
const index = async (_req, res) => {
    try {
        const users = await usertable.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//show route
const show = async (req, res) => {
    try {
        const user = await usertable.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//create new user route
const create = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await usertable.create(user);
        res.json(newUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//authenticate user
const authenticate = async (req, res) => {
    try {
        const u = await usertable.authenticate(req.body.username, req.body.password);
        let token = jsonwebtoken_1.default.sign({ user: req.body.username }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
//verifyAuthToken
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
//verifyAuthToken
const user_routes = (app) => {
    app.post('/users/verify', authenticate);
    app.post('/users/add', create);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
};
exports.default = user_routes;
