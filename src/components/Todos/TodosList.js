import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Card from "../UI/Card";
import classes from "./TodosList.module.css";

const TodoList = (props) => {
  return (
    <section className={classes.main}>
      <h1>All Todos</h1>
      <div className={classes.list}>
        <ul>
          {props.todos.map((td) => (
            <li key={td.id} className={classes.item}>
              <Card>
                <h3 className={classes.content}>{td.todo}</h3>
              </Card>

              {/* Delete button */}
              <div
                className={classes.icon}
                onClick={props.onRemoveTodo.bind(this, td.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
