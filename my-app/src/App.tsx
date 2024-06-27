import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo1 {
  id: number;
  name: string;
  iscompleted: boolean;
}

export default function Todo(){
  const [todos, setTodos] = useState<Todo1[]>([]);
  const [newTodo, setNewToDo] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  function handleAdd() {
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewToDo('');
      });
  };

  function handleDelete(id: number){
    fetch(`/api/todos/${id}`, { method: 'DELETE' }).then(() =>
      setTodos(todos.filter((todo) => todo.id !== id))
    );
  };

  function handleEdit(id: number, name: string){
    setEditId(id);
    setEditName(name);
  };

  function handleComplete(id: number){
    fetch(`/api/todos/${id}/complete`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(
          todos.map((todo) => {
            if (todo.id === data.id) {
              return data;
            }
            return todo;
          })
        );
      });
  };

  function handleIncomplete(id: number){
    fetch(`/api/todos/${id}/incomplete`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(
          todos.map((todo) => {
            if (todo.id === data.id) {
              return data;
            }
            return todo;
          })
        );
      });
  };

  function handleSave(){
    fetch(`/api/todos/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(
          todos.map((todo) => {
            if (todo.id === data.id) {
              return data;
            }
            return todo;
          })
        );
        setEditId(null);
        setEditName('');
      });
  };

  return (
    <div className="Container">
      <h1>Todo List</h1>
      <div>
        <input value={newTodo} onChange={(e) => setNewToDo(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{ backgroundColor: todo.iscompleted ? "red" : " " }}
            >
              {editId === todo.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {todo.name}
                  {todo.iscompleted ? (
                    <button onClick={() => handleIncomplete(todo.id)}>
                      Incomplete
                    </button>
                  ) : (
                    <button onClick={() => handleComplete(todo.id)}>
                      Complete
                    </button>
                  )}
                  <button onClick={() => handleEdit(todo.id, todo.name)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
