# Backend TodoApp API

A backend API built with **Node.js**, **Express**, and **Postgres**. This backend handles users and their todos.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Postgres
- **Tools**: Postman, Git

### Installation & Setup

1. **Clone the repo**
2. **Install dependencies**
3. **Set up .env**
4. **Start the server**

## API endpoints

### Todos AND Users

| Method | Endpoint | description
|`GET` |
|`POST` |`/api/auth/register`| - Register a new user
|`POST` | `/api/auth/login` | - Login and get token
|`GET` | `/api/todos  ` |- Get all todos (protected)
|`POST` |`/api/todos ` |- Create a todo (protected)
|`DELETE`|/`api/todos/:id ` |- Delete a todo (protected)
