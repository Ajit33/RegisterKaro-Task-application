import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Clock, Edit2, Trash2, Save } from 'lucide-react';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const fetchedTask = tasks.find((task) => task.id.toString() === id.toString());
    setTask(fetchedTask || null);
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.map((t) => 
      t.id.toString() === task.id.toString() ? task : t
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = tasks.filter((t) => t.id.toString() !== id.toString());
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-red-500">Task not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
     <button className='px-3 py-2 rounded-md flex left-0 bg-blue-500 mb-5' onClick={() => navigate('/')}>Back to Home</button>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full"
              placeholder="Task Title"
            />
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800">{task.title}</h1>
          )}
          {isEditing ? (
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="ml-4 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <TaskPriorityBadge priority={task.priority} />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Description</h2>
            {isEditing ? (
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 mt-1"
                placeholder="Task Description"
              />
            ) : (
              <p className="text-gray-600">{task.description}</p>
            )}
          </div>
          <div>
            <h2 className="text-lg  font-medium text-gray-700">Status</h2>
            {isEditing ? (
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-[20%] mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <TaskStatusBadge status={task.status} />
            )}
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2 inline" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              <Edit2 className="w-4 h-4 mr-2 inline" />
              Edit Task
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2 inline" />
            Delete Task
          </button>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            Created: {new Date(task.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskPriorityBadge = ({ priority }) => {
  const colorClass =
    priority === 'High' ? 'bg-red-100 text-red-600' : 
    priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
    'bg-green-100 text-green-600';
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      <AlertTriangle className="w-4 h-4 mr-1 inline" />
      {priority}
    </span>
  );
};

const TaskStatusBadge = ({ status }) => {
  const colorClass =
    status === 'Completed' ? 'bg-green-100 text-green-600' : 
    status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 
    'bg-gray-100 text-gray-600';
  const Icon = status === 'Completed' ? CheckCircle : Clock;
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      <Icon className="w-4 h-4 mr-1 inline" />
      {status}
    </span>
  );
};

export default TaskDetailsPage;