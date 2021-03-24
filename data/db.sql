CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(30) NOT NULL,
    login VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(50),
    rating INTEGER,
    role TEXT CHECK (role IN ('user', 'admin')) default 'user'
);