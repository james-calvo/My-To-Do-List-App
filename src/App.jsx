import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (input.trim()) {
            const newTasks = [...tasks, { text: input, completed: false }];
            const sortedTasks = newTasks.sort((a, b) => a.text.localeCompare(b.text));
            setTasks(sortedTasks);
            setInput('');
        }
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const toggleComplete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
        setTasks(updatedTasks);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');  // Toggle class on body
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditText(tasks[index].text);
    };

    const saveEdit = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = editText;
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditText(''); // Clear editText after saving
    };

    return (
        <div className={`container`}>
            <h2>To-Do List</h2>
            <div className="input-wrapper">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a task..."
                    className="task-input"
                />
                <button onClick={addTask} className="add-button">Add Task</button>
            </div>
            <div className="button-group">
                <button onClick={toggleDarkMode} className="dark-mode-button">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(index)}
                            className="task-checkbox"
                        />
                        <span className="task-text">{task.text}</span>
                        <div>
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="edit-input"
                                    onBlur={() => saveEdit(index)}
                                />
                            ) : null}
                            {editingIndex === index ? (
                                <button onClick={() => saveEdit(index)} className="save-button">Save</button>
                            ) : (
                                <button onClick={() => startEditing(index)} className="edit-button">Edit</button>
                            )}
                            <button onClick={() => removeTask(index)} className="delete-button">X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
