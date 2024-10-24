import React, { useState } from 'react';
import axios from 'axios';

const Add=()=> {
    const [name, setName]=useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition]=useState('');
    const [salary, setSalary]=useState('');
    const [experiance, setExperiance]=useState('');
    const [phone, setPhone]=useState('');
    const [email, setEmail]=useState('');
    const [empid, setEmpid]=useState('');
 
    
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees`,{name , position ,salary ,experiance ,phone ,email ,empid})
            .then(response => {
                console.log(response.data)
                setName('');
                setAddress('');
                setPosition('');
                setSalary('');
                setExperiance(''); 
                setPhone('');
                setEmail('');
                setEmpid('');
            })
            .catch(error => console.log(error));
    };

    return(
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-info'><u>Add Task</u></h2>
                <div>
                    <label className='text-dark'>name</label>
                    <input 
                        className='form-control'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>address</label>
                    <textarea
                        className='form-control'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>position</label>
                    <textarea
                        className='form-control'
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>salary</label>
                    <input
                        className='form-control'
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>experiance</label>
                    <input
                        className='form-control'
                        type="number"
                        value={experiance}
                        onChange={(e) => setExperiance(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>phone</label>
                    <input
                        className='form-control'
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>email</label>
                    <textarea
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <label>empid</label>
                    <input
                        className='form-control'
                        type="number"
                        value={empid}
                        onChange={(e) => setEmpid(e.target.value)}
                    />
                </div>
                <button type="submit" className='btn btn-success mt-3'>Add Task</button>
            </form>
        </div>
    );
}

export default Add;