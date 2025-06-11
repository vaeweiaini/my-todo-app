import React from 'react';
import TodoList from './src/components/TodoList';

const App: React.FC = () => {
  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default App;