import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setFalse } from '../../../stores/features/loggedReducer'
import * as API from "../../../ultis/api"
import * as TOKEN from "../../../ultis/token"

export default function useHome() {
    const [inpValue, setInpValue] = useState("");
    const [todos, setTodos] = useState([]);
    const logged = useSelector(state => state.logged.value)
    const dispatch = useDispatch()
    const { getTodos, addTodo, deleteTodo, updateTodo } = API
    let navigate = useNavigate()

    function thenGetTodos(response) {
        setTodos(response.data.data.sort((a, b) => a.id - b.id))
    }

    function thenAddTodo(response) {
        setInpValue("")
        getTodos(thenGetTodos)
    }

    function thenDeleteTodo(response) {
        getTodos(thenGetTodos)
    }

    function thenUpdateTodo(response) {
        getTodos(thenGetTodos)
    }

    function handleAdd(name) {
        addTodo(name, thenAddTodo)
    }

    function handleDelete(id) {
        deleteTodo(id, thenDeleteTodo)
    }

    function handleUpdate(id, name) {
        updateTodo(id, name, thenUpdateTodo)
    }

    function handleLogout() {
        API.logout((response) => {
            if (response.data.success) {
                TOKEN.removeToken()
                dispatch(setFalse())
            }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getTodos(thenGetTodos) }, [])
    return { logged, todos, inpValue, setInpValue, navigate, handleAdd, handleDelete, handleUpdate, handleLogout }
}