import './Task.css'
import { useState } from 'react';
import Modal from 'react-modal';
import { db, doc, setDoc, deleteDoc } from '../firebaseConfig';

function Task({ id, index, title, description, deadline, status, fetchTasks }) {
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [taskDeadline, setTaskDeadline] = useState(deadline);
    const [taskStatus, setTaskStatus] = useState(status);
    const isExpired = taskDeadline < new Date().toISOString().split('T')[0];

    const expiredStyle = isExpired ? { color: 'red' } : {};

    const getStatus = taskStatus === 'Pending' ? { color: 'red' } : taskStatus === 'In Progress' ? { color: 'blue' } : { color: 'green' };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);

    };

    const handleEdit = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskTitle || !taskDescription || !taskDeadline || !taskStatus || taskStatus === 'select') {
            alert('Attention: Please fill in all fields.');
            return;
        }
        const updatedTask = {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            status: taskStatus
        };
        try {
            const taskRef = doc(db, 'tasks', id);
            await setDoc(taskRef, updatedTask, { merge: true });
            closeModal();
        }
        catch (error) {
            alert('There was an error updating the task');

        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        const taskRef = doc(db, 'tasks', id);
        try {
            await deleteDoc(taskRef);
            fetchTasks();
        } catch (error) {
            alert('There was an error deleting the task');
        }
    };

    return (
        <div className='Task'>
            <div className="TaskTitle">{taskTitle} </div>
            <div className="TaskDescription">{taskDescription}</div>
            <div className="TaskDeadline" style={expiredStyle}>{taskDeadline}</div>
            <div className="TaskStatus" style={getStatus}>{taskStatus}</div>
            <button className="EditButton" onClick={handleEdit}>edit</button>
            <button className="DeleteButton" onClick={handleDelete}>delete</button>
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
                        <option value="select">Please select a status</option>
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