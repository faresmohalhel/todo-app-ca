import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Task from "./Task";

const List = () => {
  const { tasks, filter, selectedPriority } = useGlobalContext();

  let filtred = [...tasks];

  switch (filter) {
    case "all":
      filtred = [...tasks];
      break;
    case "completed":
      filtred = tasks.filter((task) => task.completed);
      break;
    case "uncompleted":
      filtred = tasks.filter((task) => !task.completed);
      break;
    case "priority":
      filtred = tasks.filter((task) => task.priority === selectedPriority);
      break;
    default:
      filtred = [...tasks];
      break;
  }

  return (
    <Droppable droppableId="droppable-1">
      {(provided, snapshot) => (
        <ul
          className="tasks-wrapper"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filtred.map((task, i) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              completed={task.completed}
              color={task.color}
              index={i}
              details={task.details}
              selectedPriority={task.priority}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
