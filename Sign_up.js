// Sign_up.js
import React, { useState } from 'react';
import { db } from './firebase';
import './style.css';
import { Link } from 'react-router-dom';
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore';

const Sign_up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState(''); // New state for mobile number

    const dbref = collection(db, "Auth");
    const signup = async () => {
        const matchEmail = query(dbref, where('Email', '==', email));
        try {
            const snapshot = await getDocs(matchEmail);
            const emailMatchingArray = snapshot.docs.map((doc) => doc.data());

            if (emailMatchingArray.length > 0) {
                alert("This Email Address Already exists");
            } else {
                await addDoc(dbref, { Name: name, Email: email, Password: password, Mobile: mobile });
                alert('Sign Up Successful');
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='form'>
                    <h2>Sign Up</h2>
                    <div className='box'>
                        <input type='text' placeholder="UserName" onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className='box'>
                        <input type='email' placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='box'>
                        <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className='box'>
                        <input type='text' placeholder="Mobile Number" onChange={(e) => setMobile(e.target.value)}></input>
                    </div>
                    <p>Already Have An Account<Link to='/signin'>sign In</Link></p>
                    <button onClick={signup}>Sign up</button>
                </div>
            </div>
        </>
    );
};

export default Sign_up;
