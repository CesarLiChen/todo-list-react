import { nanoid } from "nanoid";
import React, { useState } from "react";
import Todo from "./components/Todo"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  console.log(tasks);

  const [filter, setFilter] = useState("All");

  const taskList = tasks.map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} // 'key' special prop managed by React 
      onToggleTaskCompleted={toggleTaskCompleted} 
      onDeleteTask={deleteTask}
      onEditTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const tasksHeading = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    console.log(tasks[0]);
    const updatedTasks = tasks.map( (task) => {
      if(id === task.id) {
        return {...task, completed: !task.completed};
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    console.log(id);
    const tasksWithoutDeleted = tasks.filter(task => task.id !== id);
    setTasks(tasksWithoutDeleted);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map( (task) => {
      if (id === task.id) {
        return {...task, name: newName};
      } else {
        return task;
      }
    });
    setTasks(editedTaskList);
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onAddTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton /> 
      </div>
      <h2 id="list-heading">{tasksHeading}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
          {taskList}
      </ul>
    </div>
  );
}

export default App;
