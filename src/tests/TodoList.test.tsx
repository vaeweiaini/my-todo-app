import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoList from '../components/TodoList';

describe('TodoList component', () => {
  it('can add a new task', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('can toggle a task as done', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Check this' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('can remove a task', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Delete me' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const deleteButton = screen.getByText('🗑');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('can edit a task', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Original' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const task = screen.getByText('Original');
    fireEvent.doubleClick(task);

    const editInput = screen.getByDisplayValue('Original');
    fireEvent.change(editInput, { target: { value: 'Edited' } });
    fireEvent.keyDown(editInput, { key: 'Enter' });

    expect(screen.getByText('Edited')).toBeInTheDocument();
    expect(screen.queryByText('Original')).not.toBeInTheDocument();
  });
});