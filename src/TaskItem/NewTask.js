import './Task.css';
import { useState } from 'react';
function NewTask({ addTask }) {

    const [taskTitle, setTaskTitle] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);
    const [taskDeadline, setTaskDeadline] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title: taskTitle, description: taskDescription, deadline: taskDeadline, status: taskStatus });
    };

    return (
        <div className="Task">
            <input className="TaskTitle" type="text" placeholder="task title" onChange={(e) => setTaskTitle(e.target.value)} required />
            <input className="TaskDescription" type="text" placeholder="task description" onChange={(e) => setTaskDescription(e.target.value)} required />
            <input className="TaskDeadline" type="date" onChange={(e) => setTaskDeadline(e.target.value)} required />
            <select className="TaskStatus" onChange={(e) => setTaskStatus(e.target.value)} required>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit" onClick={handleSubmit} className="AddTaskButton">Add Task</button>
        </div>
    );
}
export default NewTask;