import './Task.css'
import { useState } from 'react';
import Modal from 'react-modal';

function Task({ index, title, description, deadline, status, updateTask }) {
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [taskDeadline, setTaskDeadline] = useState(deadline);
    const [taskStatus, setTaskStatus] = useState(status);
    const isExpired = taskDeadline < new Date().toISOString().split('T')[0];
    const expiredStyle = isExpired ? { color: 'red' } : {};

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);

    };

    const handleEdit = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            status: taskStatus
        };
        updateTask(index, updatedTask);
        closeModal();
    }

    return (
        <div className='Task'>
            <div className="TaskTitle">{taskTitle} </div>
            <div className="TaskDescription">{taskDescription}</div>
            <div className="TaskDeadline" style={expiredStyle}>{taskDeadline}</div>
            <div className="TaskStatus">{taskStatus}</div>
            <button className="EditButton" onClick={handleEdit}>edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='Modal'
                contentLabel='Edit your task:'>
                <div>
                    <input className="TaskTitle" type="text" placeholder={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
                    <input className="TaskDescription" type="text" placeholder={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
                    <input className="TaskDeadline" type="date" defaultValue={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} required />
                    <select className="TaskStatus" defaultChecked={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button type="submit" onClick={handleSubmit} className="AddTaskButton">submit</button>
                </div>
            </Modal>
        </div>
    );
}

export default Task;