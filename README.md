# Storefront Backend Project

## Table of Contents  

* [Description](#description)   
* [Prequisites](#prequisites)    
* [Usage](#usage)     
* [Dependencies](#dependencies)      
* [Routes](#routes)    
* [DB-tables](#db-tables)   
* [Models](#models)    
* [Important-notes](#important-notes)
 
## Description   

This is a **Storefront Backend Project** that uses node and postgres to build a backend system for a store and it was built for a Udacity course. The website provides routes to be called by front end part to allow users to add and retrieve products to and from their carts or add prodcuts and users to the store database.  

## Prequisites 

Before using the project or testing it, user need to have postgreSQL installled and then create 2 databases for development and testing on his machine. Note, make sure to remember the password you choose while installing postgresql since you will need it in following steps.

1. Install postgreSQL in your machine.     

1. Create a development database called store_database by running this commmand in a psql terminal `create database store_database;`.     

2. Create a testing database called store_database_test by running this commmand in a psql terminal `create database store_database_test;`.    

## Usage  

1. To build the project, user need to install the dependencies listed below and to do so. just run `yarn` in your terminal in project directory to build the project with all dependencies listed in package.json file.   

2. To create database tables listed below, run `db-migrate up` in your terminal in project directory. Incase you need to drop tables run `db-migrate down`

3. Create a first users in users table to be able to use Tokens in endpoints that require it. To create this user you need to send a post request to endpoint **'/users/add'** with a body with an object like this **{"firstname": "Firstname", "lastname": "Lastname", "username": "Username", "password": "Password"}** where Firstname is user's first name, Lastname is user's last name, Username is user's username and Password is user's password.  

4. To run the server, run `yarn watch` in your terminal in project directory. the server runs on host: **localhost:3000** and its endpoints and their routes as well as database schema are listed in the REQUIREMENTS.md file

5. To access endpoints that require token. 
    - first reach the authenticate endpoint through route: '/users/verify' and pass your username and password in an object to the body of the request like this example **{ username: oz, password: 123 }**. 
    - the endpoint will respond with a token in the body of the response to use it in other api endpoints. Note: you need to pass this token in the header of the requests that require a token. To do so, just pass the token as **Bearer** in the Authorization part of the header.

6. To run test on the project. run `yarn test` in your terminal in project directory. 

## Dependencies   
- Postgresql
- Node/Express/body-parser/cors 
- dotenv
- db-migrate
- jsonwebtoken
- bcrypt
- pg
- typescript
- jasmine

## Routes
- routes are also listed in REQUIREMENTS.md file    

# products
- An index  route: '/products' [GET]    
- A  show   route: '/products/:id' [GET]     
- A  create route: '/products/add' [POST] [middleware]   

# users   
- An authenticate route: '/users/verify' [POST]    
- A  create       route: '/users/add'    [POST]     
- An index        route: '/users'        [GET] [middleware]    
- A  show         route: '/users/:id'    [GET] [middleware]     

# orders    
- A  createOrder        route: '/orders'              [POST] [middleware]     
- A  showActiveOrders   route: '/orders/:id'          [GET]  [middleware]  
- An addOrderProducts   route: '/orders/products'     [POST] [middleware]    
- A  showOrderProducts  route: '/orders/products/:id' [GET]  [middleware]     

## DB-tables
- database schema are also listed in REQUIREMENTS.md file

- Table: users (id SERIAL PRIMARY KEY, firstname VARCHAR(50), lastname VARCHAR(50), username VARCHAR(50), password VARCHAR)    

- Table: products (id SERIAL PRIMARY KEY, name VARCHAR(50), price decimal)   

- Table: orders (id SERIAL PRIMARY KEY, status VARCHAR(20), user_id bigint [foreign key to users table]);

- Table: orderproducts (id SERIAL PRIMARY KEY, quantity integer, order_id bigint [foreign key to orders table], product_id bigint [foreign key to products table]);

## Models

# The api uses 3 model:

- user : it contains all function required to make operations on users table.
- product : it contains all function required to make operations on products table.
- order : it contains all function required to make operations on orders table and orderproducts table.


## Important-notes

- To go to psql terminal just type command `psql postgres postgres` in a terminal and enter the password you chose while installing postgresql.

- The server runs on host: **localhost** with port: **3000** and the database runs on port: **5432**
