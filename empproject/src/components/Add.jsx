import React, { useState } from 'react';
import axios from 'axios';

const Add=()=> {
    const [title, setTitle]=useState('');
    const [description, setDescription] = useState('');
    
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees`,{title ,description })
            .then(response => {
                console.log(response.data)
                setTitle('');
                setDescription('');
            })
            .catch(error => console.log(error));
    };

    return(
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-info'><u>Add Task</u></h2>
                <div>
                    <label className='text-dark'>Title</label>
                    <input 
                        className='form-control'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>Descriptipon</label>
                    <textarea
                        className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className='btn btn-success mt-3'>Add Task</button>
            </form>
        </div>
    );
}

export default Add;