const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8888;
const dataFile = path.join(__dirname, 'todos.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Helper functions
const readTodos = () => {
  const data = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
};

// Routes
// GET all todos
app.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST a new todo
app.post('/todos', (req, res) => {
  try {
    const todos = readTodos();
    const newTodo = {
      id: req.body.id || Date.now(),
      message: req.body.message,
      completed: false,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT (update) a todo
app.put('/todos/:id', (req, res) => {
  try {
    const todos = readTodos();
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos[todoIndex] = {
      ...todos[todoIndex],
      message: req.body.message || todos[todoIndex].message,
      completed: req.body.completed !== undefined ? req.body.completed : todos[todoIndex].completed
    };
    
    writeTodos(todos);
    res.json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  try {
    const todos = readTodos();
    const id = parseInt(req.params.id);
    const filteredTodos = todos.filter(t => t.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    writeTodos(filteredTodos);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
