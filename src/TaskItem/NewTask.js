import './Task.css';
import { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';

function NewTask({ closeModal }) {

    const [taskTitle, setTaskTitle] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);
    const [taskDeadline, setTaskDeadline] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskTitle || !taskDescription || !taskDeadline || !taskStatus || taskStatus === 'select') {
            alert('Attention: Please fill in all fields.');
            return;
        }
        try {
            await addDoc(collection(db, 'tasks'), {
                title: taskTitle,
                description: taskDescription,
                deadline: taskDeadline,
                status: taskStatus
            });
            closeModal();
        } catch (e) {
            alert('Error adding document:', e);
        }
    };

    return (
        <div className="Task">
            <input className="TaskTitle" type="text" placeholder="task title" onChange={(e) => setTaskTitle(e.target.value)} required />
            <input className="TaskDescription" type="text" placeholder="task description" onChange={(e) => setTaskDescription(e.target.value)} required />
            <input className="TaskDeadline" type="date" onChange={(e) => setTaskDeadline(e.target.value)} required />
            <select className="TaskStatus" onChange={(e) => setTaskStatus(e.target.value)} required>
                <option value="select">Please select a status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit" onClick={handleSubmit} className="AddTaskButton">Add Task</button>
        </div>
    );
}
export default NewTask;