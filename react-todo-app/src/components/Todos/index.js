import React, { useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import axios from 'axios';

export default function Todos() {
    const [todoList, setTodoList] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8888/todos')
        .then(res => {
            console.log(res)
            setTodoList(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    
    const deleteHandler = id => {
        const newTodoList = todoList.filter(item => {
            return item.id !== id
        })
        setTodoList(newTodoList)
        axios.delete(`http://localhost:8888/todos/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            setTodoList(todoList)
        })
    }

    const updateHandler = todo => {
        const updatedList = todoList.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item,
                    message: todo.message
                }
            } else {
                return item
            }
        })
        setTodoList(updatedList)
        axios.put(`http://localhost:8888/todos/${todo.id}`, todo)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            setTodoList(todoList)
        })
    }

    return (
        <div>
            <TodoForm todos={todoList} setTodos={setTodoList} />
            <TodoList todos={todoList} deleteHandler={deleteHandler} updateHandler={updateHandler} />
        </div>
    )
}