import React, { useState, useEffect } from "react";
import axios from 'axios';

const Dispay=()=> {
    const [tasks, setTasks]=useState([]);
   
    useEffect(()=>{
        axios.get(`https://aswanth74.pythonanywhere.com/api/tasks/`)
        .then(Response=>setTasks(Response.data))
        .catch(error=>console.log(error));
    },[]);

    

    return(
        <div className='container mt-3'>
            <h2>Task List</h2>
            <table className='table table-bordered table-hover'>
                {tasks.map(task=>(
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td><button className='bt btn-warning px-3' onClick={()=>editTask(task)}>Edit</button></td>
                        <td><button className='bt btn-danger' onClick={()=>DeleteTask(task.id)}>Delete</button></td>
                    </tr>   
                ))}
            </table>
            {editing ?(
                <EditTaskForm
                    currentTask={currentTask}
                    updateTask={updateTask}
                    />
            ) : null}
        </div>
    );
};



export default Dispay;

