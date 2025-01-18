import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTask from "./createTask";

// Mock the addTask and toggleCreateTaskForm functions
const mockAddTask = jest.fn();
const mockToggleCreateTaskForm = jest.fn();

describe("CreateTask Component", () => {
  
  beforeEach(() => {
    // Reset mocks before each test
    mockAddTask.mockReset();
    mockToggleCreateTaskForm.mockReset();
  });

  test("renders CreateTask form correctly", () => {
    render(<CreateTask addTask={mockAddTask} toggleCreateTaskForm={mockToggleCreateTaskForm} />);
    
    // Check if form fields are rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

  test("handles form submission with valid data", async () => {
    render(<CreateTask addTask={mockAddTask} toggleCreateTaskForm={mockToggleCreateTaskForm} />);
    
    // Simulate user input for task details
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Test Task Description" } });
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: "High" } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "In-Completed" } });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    // Check that addTask was called with correct data
    await waitFor(() => expect(mockAddTask).toHaveBeenCalledTimes(1));
    expect(mockAddTask).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Task Description",
      priority: "High",
      status: "In-Completed",
      createdAt: expect.any(String), // Check that createdAt is a string
    });
  });

  test("displays error when title or description is missing", async () => {
    render(<CreateTask addTask={mockAddTask} toggleCreateTaskForm={mockToggleCreateTaskForm} />);
    
    // Simulate form submission without title and description
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    
    // Check if error message appears
    expect(await screen.findByText(/title and description are required/i)).toBeInTheDocument();
  });

  test("shows loading state while creating task", () => {
    render(<CreateTask addTask={mockAddTask} toggleCreateTaskForm={mockToggleCreateTaskForm} />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Test Task Description" } });
    
    // Simulate form submission and check the loading state
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    expect(screen.getByRole("button", { name: /creating.../i })).toBeInTheDocument(); // Check if loading text is shown
  });

  test("disables button while loading", () => {
    render(<CreateTask addTask={mockAddTask} toggleCreateTaskForm={mockToggleCreateTaskForm} />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Test Task Description" } });
    
    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    
    // Check if the button is disabled while loading
    expect(screen.getByRole("button", { name: /create task/i })).toBeDisabled();
  });

  test("calls toggleCreateTaskForm when task is created", async () => {
    render(<CreateTask addTask={mockAddTask} toggleCreateTaskForm={mockToggleCreateTaskForm} />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Test Task Description" } });
    
    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    // Wait for task creation to finish and verify that toggleCreateTaskForm was called
    await waitFor(() => expect(mockToggleCreateTaskForm).toHaveBeenCalledTimes(1));
  });
});
