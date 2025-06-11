import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

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
    <div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
          placeholder="Add a new task"
          style={{ width: '80%', marginRight: 8 }}
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