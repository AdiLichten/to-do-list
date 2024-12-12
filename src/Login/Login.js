import React from "react";
import { useNavigate } from 'react-router-dom';
import {auth, GoogleAuthProvider, signInWithPopup} from '../firebaseConfig';
import './Login.css';

function Login() {

    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider); 
            const user = result.user; 
            const idToken = await user.getIdToken(); 
            localStorage.setItem('token', idToken); 
            navigate('/tasks'); 
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="Login">
            <button className="LoginButton" onClick={handleGoogleSignIn}>
                Login or sign up with Google
            </button>
        </div>
    );
}

export default Login;