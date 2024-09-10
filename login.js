// login.js
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './style.css';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db, auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState(''); // New state for mobile number
    const [otp, setOtp] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);

    // Function to setup Recaptcha
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {  // Ensure recaptcha is not initialized multiple times
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log('Recaptcha verified');
                },
                'expired-callback': () => {
                    console.warn('Recaptcha expired, please try again.');
                }
            }, auth);
        }
    };

    // Function to send OTP
    const handleSendOtp = async () => {
        setupRecaptcha();
        const phoneNumber = `+1${mobile}`; // Update this with the correct country code
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setVerificationResult(confirmationResult);
            setIsOTPSent(true);
            alert('OTP sent to your mobile number');
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Failed to send OTP. Please try again.');
        }
    };

    // Function to verify OTP
    const handleVerifyOtp = async () => {
        try {
            await verificationResult.confirm(otp);
            alert('User logged in successfully!');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Incorrect OTP. Please try again.');
        }
    };

    // Existing login function
    const login = async () => {
        const dbref = collection(db, 'Auth');
        try {
            const emailMatch = query(dbref, where('Email', '==', username));
            const passwordMatch = query(dbref, where('Password', '==', password));
            const emailSnapshot = await getDocs(emailMatch);
            const emailArray = emailSnapshot.docs.map((doc) => doc.data());
            const passwordSnapshot = await getDocs(passwordMatch);
            const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());
            if (emailArray.length > 0 && passwordArray.length > 0) {
                alert('Login successfully');
            } else {
                alert('Check your Email and Password or create account');
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className='container'>
                <div className='form'>
                    <h2>Login</h2>
                    <div className='box'>
                        <input type='text' placeholder="UserName" onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    <div className='box'>
                        <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className='box'>
                        <input type='text' placeholder="Mobile Number" onChange={(e) => setMobile(e.target.value)}></input>
                    </div>
                    {!isOTPSent ? (
                        <button onClick={handleSendOtp}>Send OTP</button>
                    ) : (
                        <>
                            <input type='text' placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)}></input>
                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                        </>
                    )}
                    <p>Don't Have An Account? <Link to='/sign_up'>Sign Up</Link></p> {/* Corrected the Link path */}
                    <button onClick={login}>Login</button>
                </div>
                <div id="recaptcha-container"></div> {/* Recaptcha container */}
            </div>
        </>
    );
}

export default Login;

