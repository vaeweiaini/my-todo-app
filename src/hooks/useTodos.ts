import { useEffect, useState } from 'react';
import type{ TodoItem } from '../types/todo';

const STORAGE_KEY = 'my-todo-list';

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [nextId, setNextId] = useState(() => {
    const maxId = todos.reduce((max, item) => Math.max(max, item.id), 0);
    return maxId + 1;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos(prev => [...prev, { id: nextId, text, done: false }]);
    setNextId(id => id + 1);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return { todos, addTodo, toggleTodo, removeTodo, editTodo };
}