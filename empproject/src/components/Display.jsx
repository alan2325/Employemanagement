import React, { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

const Display = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({
        id: null, name: '', address: '', position: '', salary: '', experience: '', phone: '', email: '', empid: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://alan2325.pythonanywhere.com/employe/employees/')
            .then(response => {
                setTasks(response.data);
                setFilteredTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch tasks');
                setLoading(false);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const result = tasks.filter(emp => 
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.phone.toString().includes(searchTerm.toString()) ||
            emp.empid.toString().includes(searchTerm.toString())
        );
        setFilteredTasks(result);
    }, [searchTerm, tasks]);
   

    const editTask = (task) => {
        setEditing(true);
        setCurrentTask(task);
    };

    const updateTask = (id, updatedTask) => {
        axios.put(`https://alan2325.pythonanywhere.com/employe/employees/${id}/`, updatedTask)
            .then(response => {
                setTasks(prevTasks => 
                    prevTasks.map(task => (task.id === id ? response.data : task))
                );
                setCurrentTask({ id: null, name: '', address: '', position: '', salary: '', experience: '', phone: '', email: '', empid: '' });
                setEditing(false);
            })
            .catch(error => {
                setError('Failed to update task');
                console.log(error);
            });
    };

    const deleteTask = (id) => {
        axios.delete(`https://alan2325.pythonanywhere.com/employe/employees/${id}/`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            })
            .catch(error => {
                setError('Failed to delete task');
                console.log(error);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container mt-3'>
            <h2>Task List</h2>
            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Empid</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Experience</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.empid}</td>
                            <td>{task.name}</td>
                            <td>{task.address}</td>
                            <td>{task.position}</td>
                            <td>{task.salary}</td>
                            <td>{task.experiance}</td>
                            <td>{task.phone}</td>
                            <td>{task.email}</td>
                            <td>
                                <button className='btn btn-outline-warning' onClick={() => editTask(task)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editing && (
                <EditTaskForm
                    currentTask={currentTask}
                    updateTask={updateTask}
                />
            )}
        </div>
    );
};

const EditTaskForm = ({ currentTask, updateTask }) => {
    const [task, setTask] = useState(currentTask);

    useEffect(() => {
        setTask(currentTask);
    }, [currentTask]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(task.id, task);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>
            {['name', 'address', 'position', 'salary', 'experience', 'phone', 'email', 'empid'].map(field => (
                <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                        type={field === 'salary' || field === 'experience' ? 'number' : field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={task[field]}
                        onChange={handleInputChange}
                    />
                </div>
            ))}
            <button className="btn btn-outline-primary" type="submit">Update Task</button>
        </form>
    );
};

EditTaskForm.propTypes = {
    currentTask: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired,
};

export default Display;
