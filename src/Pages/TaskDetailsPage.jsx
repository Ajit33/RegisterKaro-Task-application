import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, Calendar, CheckCircle, Clock, Edit2, Trash2 } from 'lucide-react'



const getTaskFromLocalStorage = (id) => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      console.log(tasks, "tasks") 
      if (!tasks) return null
      return tasks.find(task => task.id === id)
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error)
      return null
    }
  }
  
  

export default function TaskDetailsPage() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchedTask = getTaskFromLocalStorage(id)
    if (fetchedTask) {
      setTask(fetchedTask)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-gray-500">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-gray-500">
          <p>Task not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
              <TaskPriorityBadge priority={task.priority} />
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-600">{task.description}</p>
              </section>

              <section className="flex flex-col sm:flex-row sm:space-x-6">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Status</h2>
                <TaskStatusBadge status={task.status} />
              </section>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4">
              <Link 
                to={`/task/${task.id}/edit`}
                className="mb-3 sm:mb-0 flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Task
              </Link>
              <button 
                className="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TaskPriorityBadge = ({ priority }) => {
  const colorClass = priority === 'High' ? 'bg-red-100 text-red-800' :
                     priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                     'bg-green-100 text-green-800'

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
      <AlertTriangle className="w-4 h-4 mr-1" />
      {priority}
    </span>
  )
}

const TaskStatusBadge = ({ status }) => {
  const colorClass = status === 'Completed' ? 'bg-green-100 text-green-800' :
                     status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                     'bg-gray-100 text-gray-800'

  const StatusIcon = status === 'Completed' ? CheckCircle : Clock

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
      <StatusIcon className="w-4 h-4 mr-1" />
      {status}
    </span>
  )
}



