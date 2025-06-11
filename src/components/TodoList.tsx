import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
  const { todos, addTodo, toggleTodo, removeTodo, editTodo } = useTodos();
  const [newText, setNewText] = useState('');

  const handleAdd = () => {
    const trimmed = newText.trim();
    if (trimmed) {
      addTodo(trimmed);
      setNewText('');
    }
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
          placeholder="Add a new task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          item={todo}
          onToggle={() => toggleTodo(todo.id)}
          onRemove={() => removeTodo(todo.id)}
          onEdit={(text) => editTodo(todo.id, text)}
        />
      ))}
    </div>
  );
};

export default TodoList;