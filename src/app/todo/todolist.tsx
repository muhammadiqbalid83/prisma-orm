"use client";

import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../actions/todo";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList({ userId }: { userId: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  async function handleCreateTodo(e: React.FormEvent) {
    e.preventDefault();
    await createTodo(newTodo, userId);
    setNewTodo("");
  }

  async function fetchTodos() {
    const fetchedTodos = await getTodos(userId);
    setTodos(fetchedTodos);
  }

  async function handleToggleTodo(id: number, completed: boolean) {
    await updateTodo(id, completed);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function handleDeleteTodo(id: number) {
    await deleteTodo(id);
    fetchTodos();
  }
  return (
    <div>
      <form
        onSubmit={handleCreateTodo}
        className="flex flex-col w-[500px] mx-auto"
      >
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="bg-black text-white">
          Add
        </button>
      </form>
      <ul className="mt-28">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
