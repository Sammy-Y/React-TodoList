import { useRef } from "react";
import classes from "./NewTodoForm.module.css";

import LoadingIndicator from "../UI/LoadingIndicator";

const NewTodoForm = (props) => {
  const todoInputRef = useRef();

  // submit the form
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTodo = todoInputRef.current.value;

    const todoData = {
      todo: enteredTodo,
    };

    props.onAddTodo(todoData);
  };
  return (
    <section>
      <h1>Add Todo</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <input type="text" ref={todoInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add into List</button>
        </div>
      </form>
      {props.isLoading && <LoadingIndicator />}
    </section>
  );
};

export default NewTodoForm;
