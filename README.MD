# Backend TodoApp API

A backend API built with **Node.js**, **Express**, and **Postgres**. This backend handles users and their todos.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Postgres
- **Tools**: Postman, Git

### Installation & Setup

1. **Clone the repo**  
   git clone https://github.com/gabrieliyinbor/backend_todoapp.git
2. **Install dependencies**
   npm install
3. **Set up .env**
   create a .env file with variables below
4. **Run the database**
   psql -U postgres -f db.sql
5. **Start the server**
   node server.js

## Environment Variables

PORT=

DB_USER=

DB_HOST=

DB_NAME=

DB_PASSWORD=

DB_PORT=

JWT_SECRET=

## API endpoints

### Todos AND Users

| Method   | Endpoint             | description                 |
| :------- | :------------------- | :-------------------------- |
| `POST`   | `/api/auth/register` | - Register a new user       |
| `POST`   | `/api/auth/login`    | - Login and get token       |
| `GET`    | `/api/todos`         | - Get all todos (protected) |
| `POST`   | `/api/todos`         | - Create a todo (protected) |
| `DELETE` | `/api/todos/:id`     | - Delete a todo (protected) |
