import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import "./App.css";

function App() {
  // 1. STATE: Initialize state with localStorage data to prevent data loss
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("premiumReactTodos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // 2. SIDE EFFECT: Save to localStorage whenever 'todos' changes
  useEffect(() => {
    localStorage.setItem("premiumReactTodos", JSON.stringify(todos));
  }, [todos]);


  // Add Task
  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTodos([...todos, newTask]);
    setInputValue("");
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Delete Task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit Task
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };

  // FILTER LOGIC
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all'
  });

  return (
    <div className="app-container">
      {/* Passing todos array for Progress Bar calculations */}
      <Header todos={todos} />

      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>

      {/* Filter Buttons */}
      {todos.length > 0 && (
        <div className="filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      )}

      {/* Passing state and functions down as PROPS */}
      <ToDoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
