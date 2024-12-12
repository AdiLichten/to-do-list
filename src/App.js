import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import TaskList from './TaskList/TaskList';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<PrivateRoute element={<TaskList />} />} />
        </Routes>
    );
}

export default App;