import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(()=>{
   const listitems =  localStorage.getItem("todolist")
   if(listitems == "") return null

   return JSON.parse(listitems)
  });

  useEffect(()=>{
    localStorage.setItem("todolist",JSON.stringify(todos))
  },[todos])

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevtodos) => {
      return [
        ...prevtodos,
        { id: crypto.randomUUID(), title: task, completed: false },
      ];
    });
    setTask("");
    // const newtodos = { id: crypto.randomUUID(), title: task, completed: false };
    // const addtodos = [...todos, newtodos];
    // setTodos(addtodos);
  };

  const toggletodo = (id, completed) => {
    setTodos((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const deletetodo = (id) => {
    const newtodo = todos.filter((eachtodo) => eachtodo.id != id);
    setTodos(newtodo);
  };
  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="task" className="header">
            New Task
          </label>
          <input
            type="text"
            autoComplete="off"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></input>
          <button className="btne">Add Task</button>
        </div>
      </form>
      <div className="header">Task List</div>
      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggletodo(todo.id, e.target.checked)}
                ></input>
                <p>{todo.title}</p>
              </label>
              <button
                onClick={(e) => deletetodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
