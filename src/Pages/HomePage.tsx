import React from 'react'
import Navbar from '../components/Navbar'
import Tasks from '../components/Tasks'

const HomePage = () => {
    const taskData = [
        { title: 'Task 1', description: 'Complete the report', priority: 'High', dueDate: '2025-01-20' },
        { title: 'Task 2', description: 'Meeting with team', priority: 'Medium', dueDate: '2025-01-22' },
        { title: 'Task 3', description: 'Clean workspace', priority: 'Low', dueDate: '2025-01-25' },
      ];
      
      const delettask=()=>{

      }
      const editTask=()=>{
        
      }
  return (
    <div className='min-h-screen pag-2'>
        <Navbar />
        <Tasks tasks={taskData} onDelete={delettask} onEdit={editTask}  />
    </div>
  )
}

export default HomePage
