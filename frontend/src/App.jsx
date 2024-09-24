import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [texts, setTexts] = useState([]);
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleClearText = () => {
        setInput("");
        console.log("Text Clear");
    };

    const handleAddTodo = () => {
        const newTodo = {
            id: Date.now(),
            text: input,
            isDone: false
        }
        setTexts([...texts, newTodo]);
        setInput(""); //clear input
        fetch("//localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo: input, done: 0 })
        })
    };

    const handleClearTodo = () => {
        setTexts([]);
    };

    function handleChangeCheckbox(e) {
        const id = parseInt(e.target.id);
        const newTodo = texts.map(todo =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        );
        setTexts(newTodo);
    }

    return (
        <div>
            <div style={{ textAlign: "center", backgroundColor: "lightblue", padding: "10px", margin: "10px" }}>
                <h1 className="to-do-list" style={{ color: "black" }}>To-Do-list</h1>
                <br />
                <input type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder='Enter Text'
                />
                <button onClick={handleAddTodo} button type="button" class="btn btn-success">Add</button>
                <button onClick={handleClearText} button type="button" class="btn btn-danger">Text Clear</button>

                <ol>
                    {texts.map((item, index) => (
                        <li style={item.isDone ? { textDecoration: "line-through" } : null} key={index}>{item.text} <input id={item.id} onChange={handleChangeCheckbox} type="checkbox" checked={item.isDone} /></li>
                    ))}
                </ol>

                <button onClick={handleClearTodo} button type="button" class="btn btn-light">Liste Clear</button>
            </div>
        </div>

    );
};

export default App;