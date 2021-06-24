import React, { useContext, useState } from 'react';
import Nav from '../Nav/Nav';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";
import { UserContext } from '../../App';
import './CreateAccount.css';
import { TextField } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const CreateAccount = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [created, setCreated] = useState(false)

    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            const newUser = {
                name: user.displayName,
                email: user.email
            }
            setLoggedInUser(newUser);
            history.replace(from);            
            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    let name, validEmail, validPassword, pass, confPass;

    const handleOnBlur = (e) => {
        // console.log(e.target.name, e.target.value)
        let isFormValid = true;        
        
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
            
        }
        if(isFormValid){
            const newUser = {...loggedInUser}
            newUser[e.target.name] = e.target.value;
            setLoggedInUser(newUser);
        }
    }
    const handleSubmit = (e) => {
        // console.log(loggedInUser.name)
        firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.name = loggedInUser.name;
            // console.log(user.name);
            setCreated(true)
            history.replace(from);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
        e.preventDefault();
    }
    
    return (
        <div className="main-container">
            <Nav></Nav>
            {!created &&
                <div>
                <div className="form-div">
                    <form onSubmit = {handleSubmit}>
                        <h3>Create An Account</h3>
                        <TextField name="name" label="Name" placeholder="Enter your name" fullWidth onBlur={handleOnBlur}></TextField>
                        <br/>
                        <br/>
                        <TextField name="email" label="Email" placeholder="Enter your Email" fullWidth onBlur={handleOnBlur}></TextField>
                        <br/>
                        <br/>
                        <TextField name="password" label="Password" placeholder="Enter your password" fullWidth onBlur={handleOnBlur}></TextField>
                        <br/>
                        <br/>
                        <TextField name="confPassword" label="Confirm Password" placeholder="Enter your password" fullWidth onBlur={handleOnBlur}></TextField>
                        <br/>
                        <br/>
                        <br/>
                        <input className="submit-btn" type="submit" value="Create Your Account"/>
                        <div className="flex-div">
                            <p><small>Already have an account?</small></p>
                            <div><Link style={{color: '#e65c00'}} to="/login">Sign In</Link></div>
                            
                        </div>
                        
                    </form>
                </div>
                <div className="socialMedia-div">
                    <h2><span>Or</span></h2>
                    
                    <button onClick={handleGoogleLogin} className="media-btn">Continue With Google</button>
                </div>
            </div>}
            {created &&
            <div>  
                <h1>Account Cretaed Successfully</h1>
                <Link to='/home'>Home</Link>
            </div>
            }
        </div>
    );
};

export default CreateAccount;