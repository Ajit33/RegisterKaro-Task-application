import { useState, useEffect } from 'react';

const useTasksManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Date");

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask) => {
    const updatedTask = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, updatedTask]);
  };

  const updateTask = (id, updatedData) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, ...updatedData } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => 
    filterStatus === "All" || task.status === filterStatus
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "Date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } 
    if (sortOption === "Priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  return {
    tasks: sortedTasks,
    filterStatus,
    setFilterStatus,
    sortOption,
    setSortOption,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasksManager;
