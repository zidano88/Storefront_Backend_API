"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const producttable = new product_1.ProdcutTable();
// //index route
const index = async (_req, res) => {
    try {
        const prodcuts = await producttable.index();
        res.json(prodcuts);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//show route
const show = async (req, res) => {
    try {
        const product = await producttable.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//create new product
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        };
        const newProduct = await producttable.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//verifyToken
const verifyToken = (req, res, next) => {
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
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products/add', verifyToken, create);
};
exports.default = product_routes;
