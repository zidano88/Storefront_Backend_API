import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';


const app: express.Application = express()
const address: string = "localhost:3000";

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World! there');
})

product_routes(app);
user_routes(app);
order_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;
