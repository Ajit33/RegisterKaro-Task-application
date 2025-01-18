import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  AlertTriangle,
  Square,
} from "lucide-react";

export const Tasks = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Task List</h2>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
                task.completed
                  ? "bg-gray-100 border-l-4 border-gray-500"
                  : task.priority === "High"
                  ? "bg-red-100 border-l-4 border-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 border-l-4 border-yellow-500"
                  : "bg-green-100 border-l-4 border-green-500"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
                <PriorityIcon
                  priority={task.priority}
                  completed={task.completed}
                />
              </div>
              <p
                className={`text-sm ${
                  task.completed ? "text-gray-400" : "text-gray-600"
                } mb-4`}
              >
                {task.description.length > 100
                  ? task.description.slice(0, 100) + "..."
                  : task.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock size={16} className="mr-2" />
                {new Date(task.createdAt).toLocaleDateString("en-GB")}
              </div>
              {/* Action buttons */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/task/${task.id}`} 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <Eye size={18} className="mr-1" />
                  View
                </Link>

                <button
                  onClick={() => onDelete(task.id)}
                  className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  <Trash2 size={18} className="mr-1" />
                  Delete
                </button>

                <button
                  onClick={() =>
                    onUpdate(task.id, { completed: !task.completed })
                  }
                  className={`flex items-center ${
                    task.completed
                      ? "text-gray-600 hover:text-gray-800"
                      : "text-green-600 hover:text-green-800"
                  } transition-colors duration-200`}
                >
                  {task.completed ? (
                    <CheckCircle size={18} className="mr-1" />
                  ) : (
                    <Square size={18} className="mr-1" />
                  )}
                  {task.completed ? "Completed" : "Complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No tasks available. Add some tasks to get started.
          </p>
        </div>
      )}
    </div>
  );
};

const PriorityIcon = ({ priority, completed }) => {
  if (completed) {
    return <CheckCircle size={20} className="text-gray-500" />;
  }
  switch (priority) {
    case "High":
      return <AlertTriangle size={20} className="text-red-500" />;
    case "Medium":
      return <AlertTriangle size={20} className="text-yellow-500" />;
    default:
      return <AlertTriangle size={20} className="text-green-500" />;
  }
};
