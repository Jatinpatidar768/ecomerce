--  CREATE DATABASE ecommerce_12;
USE ecommerce_12;

-- 1. Users table (user + admin dono, role se pehchano)
-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(20) DEFAULT 'user',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- );


-- -- 2. Categories table (Men/Women/Kids)
-- CREATE TABLE categories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL
-- );

-- -- 3. Subcategories table (Clothes/Shoes)
-- CREATE TABLE subcategories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     category_id INT,
--     FOREIGN KEY (category_id) REFERENCES categories(id)
-- );

-- -- 4. Products table
-- CREATE TABLE products (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(150) NOT NULL,
--     description TEXT,
--     price DECIMAL(10,2) NOT NULL,
--     image_url VARCHAR(255),
--     company_name VARCHAR(100),
--     category_id INT,
--     subcategory_id INT,
--     stock INT DEFAULT 10,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (category_id) REFERENCES categories(id),
--     FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
-- );

-- -- 5. Cart table
-- CREATE TABLE cart (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT,
--     product_id INT,
--     quantity INT DEFAULT 1,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (product_id) REFERENCES products(id)
-- );

-- -- 6. Orders table
-- CREATE TABLE orders (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT,
--     total_amount DECIMAL(10,2),
--     status VARCHAR(50) DEFAULT 'Pending',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );



select * from categories;

UPDATE users SET role = 'admin' WHERE email = 'krishna@gmail.com';

INSERT INTO categories (name) VALUES ('Men'), ('Women'), ('Kids');
SELECT * FROM categories;

INSERT INTO subcategories (name, category_id) VALUES 
('Clothes', 1), ('Shoes', 1),   -- men
('Clothes', 2), ('Shoes', 2),   
('Clothes', 3), ('Shoes', 3);   
SELECT * FROM subcategories;
DELETE FROM subcategories;
DELETE FROM subcategories WHERE id > 0;

DELETE FROM cart WHERE id > 0;
ALTER TABLE cart AUTO_INCREMENT = 1;

DELETE FROM products WHERE id > 0;
ALTER TABLE products AUTO_INCREMENT = 1;

DELETE FROM subcategories WHERE id > 0;
ALTER TABLE subcategories AUTO_INCREMENT = 1;

SELECT * FROM products;
SELECT * FROM cart;


SELECT * FROM users WHERE company_name = 'Nike';
select name,email from users ;

DELETE from categories where id=6;
delete from subcategories where id IN (11); 


