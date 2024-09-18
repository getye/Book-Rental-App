create database bookrent;


CREATE TABLE books(
  book_id VARCHAR(255) PRIMARY KEY,
  book_owner VARCHAR(255),
  book_title VARCHAR(255),
  author VARCHAR(255),
  price DECIMAL(5,2),
  total_quantity INT,
  rent_quantity INT,
  catagory TEXT,
  book_cover TEXT,
  book_status varchar(255)
);


CREATE TABLE users(
  user_id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE,
  user_name VARCHAR(255),
  user_password VARCHAR(255),
  user_location VARCHAR(255),
  user_type VARCHAR(255),
  user_status VARCHAR(255)
); 

CREATE TABLE rents(
  rent_id VARCHAR(255) PRIMARY KEY,
  renter_id VARCHAR(255),
  book_id VARCHAR(255),
  duration INT, 
  rent_date DATE,
  end_date DATE,
  total_fee DECIMAL(5,2),
  request_status VARCHAR(25)
);

