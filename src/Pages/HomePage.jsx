import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Tasks } from '../components/Tasks';
import useTasksManager from '../hooks/TasksManager';
import CreateTask from '../components/createTask';

const HomePage = () => {
  const {
    tasks,
    filterStatus,
    setFilterStatus,
    sortOption,
    setSortOption,
    addTask,
    updateTask,
    deleteTask,
  } = useTasksManager();

  const [showCreateTask, setShowCreateTask] = useState(false);

  const toggleCreateTaskForm = () => setShowCreateTask(!showCreateTask);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter((task) => task.status === "Completed").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter((task) => task.status === "in-completed").length}
            </p>
          </div>
        </div>

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
              <CreateTask addTask={addTask} toggleCreateTaskForm={toggleCreateTaskForm} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <Tasks tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
