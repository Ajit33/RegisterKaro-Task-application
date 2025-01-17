import React from "react";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-gray-100 shadow-md 
    p-2 md:p-8 sm:px-0">

      <h1 className="text-sm md:text-xl font-bold text-gray-800">Task Management</h1>
      <div className="flex items-center gap-2 md:space-x-4 flex-wrap">
        {/* Filter by status */}
        <select
          name="status"
          id="status"
          className="p-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="in-completed">In-Completed</option>
        </select>

        {/* Sort options */}
        <select
          name="sort"
          id="sort"
          className="p-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Date</option>
          <option value="Priority">Priority</option>
        </select>

        {/* Create Task Button */}
        <button className="px-3 md:px-4 py-2 text-sm md:text-base text-white bg-black rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Navbar;



