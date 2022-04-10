import express, { Request, Response } from 'express';
import { OrderTable } from '../models/order';
import jwt, { Secret } from 'jsonwebtoken';


const ordertable = new OrderTable();

//addProduct route
const createOrder = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.body.userId);
    try {
        const addedProduct = await ordertable.createOrder(userId);
        res.json(addedProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

//showActiveOrders route
const showActiveOrders = async (req: Request, res: Response) => {
    try {
        const order = await ordertable.showActiveOrders(parseInt(req.params.id));
        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

//add prodcuts to an order
const addOrderProducts = async (req: Request, res: Response) => {
    try {
        const quantity: number = parseInt(req.body.quantity);
        const orderId: number = parseInt(req.body.orderId);
        const productId: number = parseInt(req.body.productId);
        const orderProdcut = await ordertable.addOrderProducts(quantity, orderId, productId);
        res.json(orderProdcut);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

//show products of an order
const showOrderProducts = async (req: Request, res: Response) => {
    try {
        const orderId: number = parseInt(req.params.id);
        const orderproducts = await ordertable.showOrderProducts(orderId);
        res.json(orderproducts);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

//verifyToken
const verifyToken = (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
        next()
    } catch (error) {
        res.status(401)
    }
};

const order_routes = (app: express.Application) => {
    app.post('/orders', verifyToken, createOrder);
    app.get('/orders/:id', verifyToken, showActiveOrders);
    app.post('/orders/products', verifyToken, addOrderProducts);
    app.get('/orders/products/:id', verifyToken, showOrderProducts);
};

export default order_routes;