import './TaskList.css';
import Task from '../TaskItem/Task';
import NewTask from '../TaskItem/NewTask';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { db, collection, getDocs } from '../firebaseConfig';

Modal.setAppElement('#root');

function TaskList() {

  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchTasks();
  };

  return (
    <div id='root' className="TaskList">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='Modal'
        contentLabel='Add a new task'>
        <NewTask
          closeModal={closeModal}
        />
      </Modal>
      <div className='TasksContainer'>
        <button className="AddTaskButton" onClick={handleAddTask}>Add a new Task</button>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            id={task.id}
            index={index}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            status={task.status}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
