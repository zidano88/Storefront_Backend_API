"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ordertable = new order_1.OrderTable();
//addProduct route
const createOrder = async (req, res) => {
    const userId = parseInt(req.body.userId);
    try {
        const addedProduct = await ordertable.createOrder(userId);
        res.json(addedProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//showActiveOrders route
const showActiveOrders = async (req, res) => {
    try {
        const order = await ordertable.showActiveOrders(parseInt(req.params.id));
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//add prodcuts to an order
const addOrderProducts = async (req, res) => {
    try {
        const quantity = parseInt(req.body.quantity);
        const orderId = parseInt(req.body.orderId);
        const productId = parseInt(req.body.productId);
        const orderProdcut = await ordertable.addOrderProducts(quantity, orderId, productId);
        res.json(orderProdcut);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//show products of an order
const showOrderProducts = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const orderproducts = await ordertable.showOrderProducts(orderId);
        res.json(orderproducts);
    }
    catch (error) {
        res.status(400);
        res.json(error);
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
const order_routes = (app) => {
    app.post('/orders', verifyToken, createOrder);
    app.get('/orders/:id', verifyToken, showActiveOrders);
    app.post('/orders/products', verifyToken, addOrderProducts);
    app.get('/orders/products/:id', verifyToken, showOrderProducts);
};
exports.default = order_routes;
