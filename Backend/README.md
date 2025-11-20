# Backend - To-Do CRUD API

This is a simple backend project built using **Node.js + Express**.  
It includes basic CRUD operations for managing To-Do items, and data is stored in a local `todos.json` file.

## How to Run

### 1. Install dependencies

npm install

### 2. Start the server

npm start

or (for nodemon)

npm run dev

Server runs on: http://localhost:3000

## API Endpoints

### GET /todos  
Returns all todos.

### POST /todos  
Creates a new todo.  
Sample body:
```json
{ "title": "My task" }

PUT /todos/:id

Updates an existing todo.

DELETE /todos/:id

Deletes a todo.
