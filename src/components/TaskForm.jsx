import { useState } from "react";

export const TaskForm = ({ onSave, onClose, initialTask }) => {
  const [task, setTask] = useState(initialTask || { title: "", description: "", priority: "Low" });
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState(""); // For error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task.title || !task.description) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);
    try {
      await onSave(task); // Assuming onSave is async
      setLoading(false);
      onClose(); // Close the form after saving
    } catch (err) {
      setLoading(false);
      setError("An error occurred while saving the task.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{initialTask ? "Edit Task" : "Create Task"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading} // Disable button if loading
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
