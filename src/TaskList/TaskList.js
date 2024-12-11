import './TaskList.css';
import Task from '../TaskItem/Task';
import NewTask from '../TaskItem/NewTask';
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TaskList() {

  const [tasks, setTasks] = useState([{ title: 'Morning Exercise', description: 'Complete a 30-minute workout session.', deadline: '2024-12-12', status: 'Pending' },
  { title: 'Grocery Shopping', description: 'Buy vegetables, fruits, milk, and other household essentials.', deadline: '2024-12-12', status: 'In Progress' },
  { title: 'Email Management', description: 'Respond to work emails and organize the inbox.', deadline: '2023-12-12', status: 'Pending' },
  { title: 'Project Work', description: 'Complete the frontend design for the task management application.', deadline: '2024-12-13', status: 'In Progress' },
  { title: 'Dinner Prep', description: 'Cook pasta and salad for dinner.', deadline: '2024-12-12', status: 'Pending' }]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddTask = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);

  };

  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
    closeModal();
  }

  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  return (
    <div id='root' className="TaskList">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='Modal'
        contentLabel='Add a new task'>
        <NewTask addTask={addNewTask} />
      </Modal>
      <div className='TasksContainer'>
        <button className="AddTaskButton" onClick={handleAddTask}>Add a new Task</button>
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            status={task.status}
            updateTask={updateTask} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
