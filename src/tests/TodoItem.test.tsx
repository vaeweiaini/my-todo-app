import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../components/TodoItem';
import type{ TodoItem as Todo } from '../types/todo';

describe('TodoItem component', () => {
  const mockTodo: Todo = {
    id: 1,
    text: 'Sample Task',
    done: false,
  };

  const setup = (overrides = {}) => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();
    const onEdit = vi.fn();

    render(
      <TodoItem
        item={{ ...mockTodo, ...overrides }}
        onToggle={onToggle}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    );

    return { onToggle, onRemove, onEdit };
  };

  it('renders todo text', () => {
    setup();
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const { onToggle } = setup();
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('calls onRemove when delete button is clicked', () => {
    const { onRemove } = setup();
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('enters editing mode on double-click', () => {
    setup();
    const text = screen.getByText('Sample Task');
    fireEvent.doubleClick(text);
    expect(screen.getByDisplayValue('Sample Task')).toBeInTheDocument();
  });

  it('calls onEdit when edited text is submitted (Enter)', () => {
    const { onEdit } = setup();
    const text = screen.getByText('Sample Task');
    fireEvent.doubleClick(text);

    const input = screen.getByDisplayValue('Sample Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onEdit).toHaveBeenCalledWith('Updated Task');
  });

  it('calls onEdit when edited text is blurred', () => {
    const { onEdit } = setup();
    const text = screen.getByText('Sample Task');
    fireEvent.doubleClick(text);

    const input = screen.getByDisplayValue('Sample Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.blur(input);

    expect(onEdit).toHaveBeenCalledWith('Updated Task');
  });
});