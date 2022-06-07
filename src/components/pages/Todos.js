import { useState, useEffect } from "react";

import TodoList from "../Todos/TodosList";
import NewTodoForm from "../Todos/NewTodoForm";
import LoadingIndicator from "../UI/LoadingIndicator";

import classes from "./Todos.module.css";

const DUMMY_DATA = [
  { todo: "Learn React" },
  {
    todo: "Learn English",
  },
];

const Todos = () => {
  const [userTodos, setUserTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load the data from database when page loaded
  useEffect(() => {
    fetch(
      "https://react-todolist-2f4fc-default-rtdb.firebaseio.com/todos.json",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const loadedTodos = [];
        // responseData is object , need to change it as array
        for (const key in responseData) {
          loadedTodos.push({
            id: key,
            todo: responseData[key].todo,
          });
        }
        setUserTodos(loadedTodos);
      });
  }, []);

  // Add New Todo to the database
  const addTodoHandler = (todo) => {
    setIsLoading(true); // Loading spainner
    // fetch new data to the database
    fetch(
      "https://react-todolist-2f4fc-default-rtdb.firebaseio.com/todos.json",
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setUserTodos((prevUserTodos) => [
          ...prevUserTodos,
          { id: responseData.name, ...todo },
        ]);
      });
  };

  // Remove Todo from database
  const removeTodoHandler = (todoId) => {
    setIsLoading(true); // Loading spainner
    fetch(
      `https://react-todolist-2f4fc-default-rtdb.firebaseio.com/todos/${todoId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setIsLoading(false);
      setUserTodos((prevUserTodos) =>
        prevUserTodos.filter((todo) => todo.id !== todoId)
      );
    });
  };

  return (
    <div className={classes.main}>
      <NewTodoForm onAddTodo={addTodoHandler} isLoading={isLoading} />
      <TodoList todos={userTodos} onRemoveTodo={removeTodoHandler} />
    </div>
  );
};

export default Todos;
