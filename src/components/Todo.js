import React, { useState } from 'react';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({userInput: '', todoList: [] })

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
    setTodoList(todoList.concat(todoName));
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
        // {todoState.todoList.map(todo => (
        {todoList.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
