import React, { useState } from "react";

const CreateTask = ({ addTask, toggleCreateTaskForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("In-Completed");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);
    try {
      // Create a new task object
      const newTask = {
        title,
        description,
        priority,
        status,
        createdAt: new Date().toISOString(), 
      };

     
      await addTask(newTask);

      // Reset the fieldssss
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("In-Completed");

    
      toggleCreateTaskForm();
    } catch (err) {
      setError("An error occurred while creating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            aria-required="true"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="In-Completed">In-Completed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;



