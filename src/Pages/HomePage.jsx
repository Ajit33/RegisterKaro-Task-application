import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import CreateTask from '../components/createTask';
import { Tasks } from '../components/Tasks';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Date");
  const [showCreateTask, setShowCreateTask] = useState(false);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    // Check if the tasks are stored in localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      // If tasks are found in localStorage, parse and set them in state
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    } else {
      console.log('No tasks found in localStorage'); // Log if no tasks are found
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      try {
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    } else {
      console.log('No tasks to save in localStorage'); // Log if no tasks to save
    }
  }, [tasks]); // This effect runs whenever tasks state changes

  // Function to add a new task
  const addTask = (newTask) => {
    const updatedTask = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, updatedTask];
      return updatedTasks;
    });
  };

  // Function to update an existing task
  const updateTask = (id, updatedData) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      );
      return updatedTasks;
    });
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "All") return true;
    return task.status === filterStatus;
  });

  // Sort tasks based on selected option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "Date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "Priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  // Toggle Create Task Modal
  const toggleCreateTaskForm = () => {
    setShowCreateTask(!showCreateTask);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOption={sortOption}
        setSortOption={setSortOption}
        toggleCreateTaskForm={toggleCreateTaskForm}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Task Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter(task => task.status === "Completed").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter(task => task.status === "in-completed").length}
            </p>
          </div>
        </div>

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Task</h2>
                <button 
                  onClick={toggleCreateTaskForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <CreateTask 
                addTask={addTask} 
                toggleCreateTaskForm={toggleCreateTaskForm}
              />
            </div>
          </div>
        )}

        {/* Tasks List Container */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <Tasks 
              tasks={sortedTasks} 
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
