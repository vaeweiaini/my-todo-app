import React from 'react';
import TodoList from './components/TodoList';
import './index.css'; 

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default App;