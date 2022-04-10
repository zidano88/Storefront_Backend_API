CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR(50), lastname VARCHAR(50), username VARCHAR(50), password VARCHAR);

-- CREATE TABLE users (id integer NOT NULL, firstname VARCHAR(50), lastname VARCHAR(50), username VARCHAR(50), password VARCHAR, constraint pk_users primary key (id));