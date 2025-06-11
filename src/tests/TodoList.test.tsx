import { render, screen, fireEvent, within } from '@testing-library/react';
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

    const todoItem = screen.getByText('Check this').closest('.todo-item') as HTMLElement;
    expect(todoItem).toBeInTheDocument();

    const checkbox = within(todoItem).getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('can remove a task', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Delete me' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const todoItem = screen.getByText('Delete me').closest('.todo-item') as HTMLElement;
    expect(todoItem).toBeInTheDocument();

    const deleteButton = within(todoItem).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });
});