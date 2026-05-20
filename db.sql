CREATE DATABASE todoapp;
\c todoapp
CREATE TABLE users (
    id text not null primary key,
    username varchar(10) not null unique,
    email varchar(255) not null unique,
    password text not null,
    created_at timestamp default now()
);

CREATE TABLE todos(
    id text primary key,
    user_id text references users(id),
    todo text not null,
    created_at timestamp default now(),
    completed boolean default FALSE
);