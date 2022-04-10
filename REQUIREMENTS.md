# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints  
#### Products   
- Index                     route: '/products' [GET]   
- Show                      route: '/products/:id' [GET]   
- Create [token required]   route: '/products/add' [POST] [middleware]   

#### Users    
- Authenticate              route: '/users/verify' [POST]   
- Index [token required]    route: '/users'        [GET] [middleware]      
- Show [token required]     route: '/users/:id'    [GET] [middleware]      
- Create                    route: '/users/add'    [POST]   

#### Orders    
- createOrder       [token required]  route: '/orders'              [POST] [middleware]      
- showActiveOrders  [token required]  route: '/orders/:id'          [GET]  [middleware]      
- addOrderProducts  [token required]  route: '/orders/products'     [POST] [middleware]        
- showOrderProducts [token required]  route: '/orders/products/:id' [GET]  [middleware]   


## Data Shapes   
#### Products     
- id    (number) [SERIAL PRIMARY KEY]    
- name   (string) [VARCHAR(50)]   
- price  (number) [decimal]    

#### Users    
- id         (number) [SERIAL PRIMARY KEY]     
- firstName  (string) [VARCHAR(50)]     
- lastName   (string) [VARCHAR(50)]   
- username   (string) [VARCHAR(50)]   
- password   (string) [VARCHAR]    

#### Orders       
- id         (number) [SERIAL PRIMARY KEY]    
- status     (string) [VARCHAR(20)]      
- user_id    (number) [bigint REFERENCES users(id)]   

#### Orderproducts
- id         (number) [SERIAL PRIMARY KEY]   
- quantity   (number) [integer]  
- order_id   (number) [bigint REFERENCES orders(id)] 
- product_id (number) [bigint REFERENCES products(id)]  
  