import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [experiance, setExperiance] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [empid, setEmpid] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // document.getElementById("container mt-3").style.display = "none";
        
        // Input validation
        if (salary < 0 || experiance < 0) {
            setMessage('Salary and experience must be non-negative.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }
        if (phone.length < 10) {
            setMessage('Please enter a valid phone number.');
            return;
        }

        
        setLoading(true);

        axios.post('https://alan2325.pythonanywhere.com/employe/employees/', {
            name,
            address,
            position,
            salary,
            experiance,
            phone,
            email,
            empid
        })
        .then(response => {
            console.log(response.data);
            setMessage('Employee added successfully!');
            // Clear form fields
            setName('');
            setAddress('');
            setPosition('');
            setSalary('');
            setExperiance('');
            setPhone('');
            setEmail('');
            setEmpid('');
        })
        .catch(error => {
            console.error(error);
            setMessage('Error adding employee. Please try again.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-success'><u>Add Employee</u></h2>
                <div>
                    <label className='text-dark'>Name</label>
                    <input
                        className='form-control'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label>Address</label>
                    <textarea
                        className='form-control'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label>Position</label>
                    <input
                        className='form-control'
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-dark'>Salary</label>
                    <input
                        className='form-control'
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-dark'>Experience (in years)</label>
                    <input
                        className='form-control'
                        type="number"
                        value={experiance}
                        onChange={(e) => setExperiance(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-dark'>Phone</label>
                    <input
                        className='form-control'
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-dark'>Email</label>
                    <input
                        className='form-control'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-dark'>Emp ID</label>
                    <input
                        className='form-control'
                        type="text" // Change to "text" for flexibility
                        value={empid}
                        onChange={(e) => setEmpid(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='btn btn-primary mt-2' disabled={loading}>
                    {loading ? 'Inserting...' : 'Insert'}
                </button>
                {message && <div className='mt-2'>{message}</div>}
            </form>
        </div>
    );
};

export default Add;