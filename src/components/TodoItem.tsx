import React, { useState } from 'react';
import type{ TodoItem as Todo } from '../types/todo';

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
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <input
        type="checkbox"
        checked={item.done}
        onChange={onToggle}
        style={{ marginRight: 8 }}
      />
      {isEditing ? (
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
            }}
            autoFocus
          />
        </>
      ) : (
        <span
          style={{
            textDecoration: item.done ? 'line-through' : 'none',
            flexGrow: 1,
            cursor: 'pointer'
          }}
          onDoubleClick={() => setEditing(true)}
        >
          {item.text}
        </span>
      )}
      <button onClick={onRemove} style={{ marginLeft: 8 }}>🗑</button>
    </div>
  );
};

export default TodoItem;