import React, { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

const Display = () => {
    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({
        id: null, name: '', address: '', position: '', salary: '', experiance: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://aiswarya2325.pythonanywhere.com/employemanagement/employees')
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch tasks');
                setLoading(false);
                console.log(error);
            });
    }, []);

    const editTask = (task) => {
        setEditing(true);
        setCurrentTask(task);
    };

    const updateTask = (id, updatedTask) => {
        setEditing(false);
        axios.put(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`, updatedTask)
            .then(response => {
                setTasks(tasks.map(task => (task.id === id ? response.data : task)));
                setCurrentTask({ id: null, name: '', address: '', position: '', salary: '', experiance: '' });
            })
            .catch(error => {
                setError('Failed to update task');
                console.log(error);
            });
    };

    const deleteTask = (id) => {
        axios.delete(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
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
            <table className='table table-bordered table-hover'>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.address}</td>
                            <td>{task.position}</td>
                            <td>{task.salary}</td>
                            <td>{task.experiance}</td>
                            <td>{task.phone}</td>
                            <td>{task.email}</td>
                            <td>
                                <button className='btn btn-warning' onClick={() => editTask(task)}>Edit</button>
                            </td>
                            <td>
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
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={task.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={task.address}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Position</label>
                <input
                    type="text"
                    name="position"
                    value={task.position}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Salary</label>
                <input
                    type="number"
                    name="salary"
                    value={task.salary}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Experience</label>
                <input
                    type="number"
                    name="experiance"
                    value={task.experiance}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={task.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={task.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Employee ID</label>
                <input
                    type="number"
                    name="empid"
                    value={task.empid}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Update Task</button>
        </form>
    );
};

EditTaskForm.propTypes = {
    currentTask: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired,
};

export default Display;
