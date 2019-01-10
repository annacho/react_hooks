import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({userInput: '', todoList: [] })

  useEffect(() => {
    axios.get('https://react-hooks-319f3.firebaseio.com/todos.json').then(result => {
      console.log(result);
      const todoData = result.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({id: key, name: todoData[key].name})
      }
      setTodoList(todos);
    });
    return () => {
      console.log('Cleanup');
    };
  }, []);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  useEffect(() => {
    if (submittedTodo) {
    setTodoList(todoList.concat(submittedTodo));
    }
  },
    [submittedTodo]
  );

  const inputChangeHandler = (event) => {
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList
    // });
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });

    axios
      .post('https://react-hooks-319f3.firebaseio.com/todos.json', {name: todoName})
      .then(res => {
        setTimeout(() => {
          const todoItem = {id: res.data.name, name: todoName};
          setSubmittedTodo(todoItem);
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        // value={todoState.userInput}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>Add</button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
