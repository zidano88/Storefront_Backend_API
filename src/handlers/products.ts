import express, { Request, Response } from 'express';
import { Product, ProdcutTable } from '../models/product';
import jwt, { Secret } from 'jsonwebtoken';

const producttable = new ProdcutTable();

// //index route
const index = async (_req: Request, res: Response) => {
    try {
        const prodcuts = await producttable.index();
        res.json(prodcuts);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
};

//show route
const show = async (req: Request, res: Response) => {
    try {
        const product = await producttable.show(parseInt(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

};

//create new product
const create = async (req: Request, res: Response) => {

    try {
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        }

        const newProduct = await producttable.create(product);
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

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

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products/add', verifyToken, create);
};

export default product_routes;
