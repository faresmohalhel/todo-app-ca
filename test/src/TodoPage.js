import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";
import Colors from "./Colors";
import "./index.css";

const App = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
    details,
    setDetails,
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    priorityOptions,
  } = useGlobalContext();

const addTask = (e) => {
  e.preventDefault();
    if (!name || !details || !selectedPriority) {
      showAlert(true, "Please fill in all fields.");
      return;
    }
  if (isEditing) {
    const updatedTasks = tasks.map((task) =>
      task.id === editId ? { ...task, name, details } : task
    );
    setTasks(updatedTasks);
    showAlert(true, "Task Updated.");
    setIsEditing(false);
    setEditId(null);
  } else {
    const newTask = {
      id: new Date().getTime().toString(),
      name,
      details,
      priority: selectedPriority, // Add priority field
      completed: false,
    };
    setTasks([...tasks, newTask]);
    showAlert(true, "Task Added.");
  }
  setName("");
  setDetails("");
  setSelectedPriority(""); // Reset selected priority
};



  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
    showAlert(true, "Your list is clear!");
  };
  
  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    //   body.
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };
  
const filteredTasks = tasks.filter((task) =>
  task.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <div className="min-h-screen">
      <div className="container " onClick={hideColorsContainer}>
        {isColorsOpen && <Colors />}
        {alert && <Alert msg={alert.msg} />}
        <form className="head flex items-center" onSubmit={addTask}>
          <input
            type="text"
            ref={inputRef}
            placeholder="New Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600 mb-5"
          />
          <select
            className="text-gray-600 mr-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option className="text-gray-600" value="">
              Select Priority
            </option>
            {priorityOptions.map((priority) => (
              <option className="text-gray-600" key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mr-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  text-gray-600"
          />

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            {isEditing ? "Edit" : "Add"}
          </button>
        </form>
        <input
          type="text"
          className="text-gray-600 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-5"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter">
          <button
            data-filter="all"
            className={filter === "all" ? "active" : ""}
            onClick={filterTasks}
          >
            All
          </button>
          <button
            data-filter="completed"
            className={filter === "completed" ? "active" : ""}
            onClick={filterTasks}
          >
            Completed
          </button>
          <button
            data-filter="uncompleted"
            className={filter === "uncompleted" ? "active" : ""}
            onClick={filterTasks}
          >
            Uncompleted
          </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {filteredTasks.length > 0 ? (
            <List />
          ) : (
            <p className="no-tasks">Your list is clear!</p>
          )}
        </DragDropContext>
        {filteredTasks.length > 2 && (
          <button
            className="btn-delete-all"
            onClick={deleteAll}
            title="Delete All Tasks (Completed and Uncompleted)!"
          >
            Clear All
          </button>
        )}
      
      </div>
    </div>
  );
};

export default App;
