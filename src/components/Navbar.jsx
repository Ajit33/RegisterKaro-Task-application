import React from "react";

export const Navbar = ({ filterStatus, setFilterStatus, sortOption, setSortOption, toggleCreateTaskForm }) => {
  return (
    <div className="flex w-full items-center justify-between bg-gray-100 shadow-md p-2 md:p-8 sm:px-0">
      <h1 className="text-sm md:text-xl font-bold text-gray-800" aria-label="Task Management">Task Management</h1>
      <div className="flex items-center gap-2 md:space-x-4 flex-wrap">
        {/* Filter by status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter tasks by status"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In-Completed">In-Completed</option>
        </select>

        {/* Sort options */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Sort tasks by"
        >
          <option value="Date">Date</option>
          <option value="Priority">Priority</option>
        </select>

        {/* Create Task Button */}
        <button
          onClick={toggleCreateTaskForm}
          className="px-3 md:px-4 py-2 text-sm md:text-base text-white bg-black rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Create a new task"
        >
          Create Task
        </button>
      </div>
    </div>
  );
};
