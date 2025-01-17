import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Tasks = ({ tasks, onEdit, onDelete }) => {
  const [expandedDescription, setExpandedDescription] = useState({});

  // Function to toggle description view
  const toggleDescription = (index) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Function to determine the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-400 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md relative ${getPriorityColor(
                task.priority
              )}`}
            >
              {/* Task title */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{task.name}</h2>
                <div className="flex space-x-2">
                  {/* Edit Icon */}
                  <FaEdit
                    className="text-gray-800 hover:text-blue-500 cursor-pointer"
                    onClick={() => onEdit(task)}
                  />
                  {/* Delete Icon */}
                  <FaTrashAlt
                    className="text-gray-800 hover:text-red-500 cursor-pointer"
                    onClick={() => onDelete(task.id)}
                  />
                </div>
              </div>

              {/* Task description */}
              <p className="text-sm mt-2">
                {expandedDescription[index]
                  ? task.description
                  : `${task.description.slice(0, 100)}...`}
                {task.description.length > 100 && (
                  <span
                    onClick={() => toggleDescription(index)}
                    className="text-blue-500 cursor-pointer ml-1"
                  >
                    {expandedDescription[index] ? 'Show Less' : 'Read More'}
                  </span>
                )}
              </p>

              {/* Task details */}
              <p className="text-sm mt-2 font-medium">Priority: {task.priority}</p>
              <p className="text-sm mt-2">Created At: {task.createdAt}</p>
              <p className="text-sm mt-2">Status: {task.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
