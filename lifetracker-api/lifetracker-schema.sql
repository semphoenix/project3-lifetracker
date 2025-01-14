CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username TEXT NOT NULL,
   password TEXT NOT NULL,
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   category TEXT NOT NULL,
   quantity INT NOT NULL,
   calories INT NOT NULL,
   image_url TEXT NOT NULL,
   user_id INT NOT NULL, 
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercise (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   category TEXT NOT NULL,
   duration INT NOT NULL,
   intensity INT NOT NULL,
   user_id INT NOT NULL, 
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sleep (
   id SERIAL PRIMARY KEY,
   start_time TIMESTAMP NOT NULL,
   end_time TIMESTAMP NOT NULL,
   user_id INT NOT NULL, 
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);