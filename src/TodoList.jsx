import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

export default function TodoList() {
    let [todos, setTodos] = useState([]);
    let [newTodos, setNewTodos] = useState("");

    let addNewTask = () => {
        if (!newTodos.trim()) return;
        setTodos((prevTodos) => {
            return [...prevTodos, {task: newTodos, id: uuidv4(), isDone: false}]
        });
        setNewTodos("");
    }

    let updateTodoValue = (event) => {
        setNewTodos(event.target.value);
    }

    let handleKeyDown = (event) => {
        if (event.key === "Enter") addNewTask();
    }

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
    }

    let markAsDoneAll = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true,
            }))
        );
    };

    let toggleDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    }

    return (
        <div className="todo-app">
            <div className="todo-card">
                <h4 className="todo-title">Todo List</h4>

                <div className="todo-input-row">
                    <input
                        className="todo-input"
                        placeholder="Add a task"
                        value={newTodos}
                        onChange={updateTodoValue}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn-primary" onClick={addNewTask}>Add</button>
                </div>

                {todos.length === 0 ? (
                    <p className="todo-empty">No tasks yet — add one above ✨</p>
                ) : (
                    <ul className="todo-list">
                        {todos.map((todo) => (
                            <li className={`todo-item ${todo.isDone ? "done" : ""}`} key={todo.id}>
                                <label className="todo-check-label">
                                    <input
                                        type="checkbox"
                                        checked={todo.isDone}
                                        onChange={() => toggleDone(todo.id)}
                                    />
                                    <span className="todo-text">{todo.task}</span>
                                </label>
                                <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>✕</button>
                            </li>
                        ))}
                    </ul>
                )}

                {todos.length > 0 && (
                    <button className="btn-secondary" onClick={markAsDoneAll}>Mark all as done</button>
                )}
            </div>
        </div>
    );
}