import React, { useState } from 'react';
import type { TodoItem as Todo } from '../types/todo';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './TodoItem.module.css';

interface Props {
  item: Todo;
  onToggle: () => void;
  onRemove: () => void;
  onEdit: (text: string) => void;
}

const TodoItem: React.FC<Props> = ({ item, onToggle, onRemove, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(item.text);

  const handleEdit = () => {
    setEditing(false);
    if (value.trim()) onEdit(value.trim());
  };

  return (
    <div className={styles.todoItem}>
      <input type="checkbox" checked={item.done} onChange={onToggle} />
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span
          className={item.done ? styles.done : ''}
          onDoubleClick={() => setEditing(true)}
        >
          {item.text}
        </span>
      )}
      <button onClick={onRemove} title="Delete">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default TodoItem;