const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = path.join(__dirname, "todos.json");

// Helper: read todos
function loadTodos() {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

// Helper: save todos
function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2), "utf8");
}

// Health API
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// GET all todos
app.get("/todos", (req, res) => {
  const todos = loadTodos();
  res.json(todos);
});

// POST create todo
app.post("/todos", (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Invalid 'title'" });
  }

  const todos = loadTodos();
  const todo = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: typeof completed === "boolean" ? completed : false,
    createdAt: new Date().toISOString()
  };

  todos.push(todo);
  saveTodos(todos);

  res.status(201).json(todo);
});

// PUT update todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { title, completed } = req.body;

  const todos = loadTodos();
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Invalid title" });
    }
    todos[index].title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid completed value" });
    }
    todos[index].completed = completed;
  }

  todos[index].updatedAt = new Date().toISOString();
  saveTodos(todos);

  res.json(todos[index]);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let todos = loadTodos();

  if (!todos.find(t => t.id === id)) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos = todos.filter(t => t.id !== id);
  saveTodos(todos);

  res.json({ message: "Deleted successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo API running on port ${PORT}`);
});
