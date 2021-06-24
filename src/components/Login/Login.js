import React, { useContext, useState } from 'react';
import Nav from '../Nav/Nav';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";
import { UserContext } from '../../App';
import { TextField } from '@material-ui/core';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

   
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    
    const handleOnBlur = (e) => {
        // console.log(e.target.name, e.target.value)
        let isFormValid = true;        
        
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
            
        }
        if(isFormValid){
            const info = {...loginInfo}
            info[e.target.name] = e.target.value;
            setLoginInfo(info);
        }
        
    }

    const handleSubmit = (e) => {
        if(loginInfo.email && loginInfo.password){
            firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const usr = {
                    name: user.name,
                    email: user.email,
                    password: '',
                    confPassword: ''
                }
                setLoggedInUser(usr)
                history.replace(from);
                
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
        e.preventDefault();
    }
    

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

    return (
        <div className="main-container">
            <Nav></Nav>
            
                {!loggedInUser.email &&
                <div>
                <div className="form-div">
                    <form onSubmit = {handleSubmit}>
                        <TextField name="email" label="Email" placeholder="Enter your Email" fullWidth onBlur={handleOnBlur}></TextField>
                        <br/>
                        <br/>
                        <TextField name="password" label="Password" placeholder="Enter your password" fullWidth onBlur={handleOnBlur}></TextField>
                        <br/>
                        <br/>
                        <br/>
                        <input className="submit-btn" type="submit" value="Log In"/>
                        <div className="flex-div">
                            <p><small>Do not have an account?</small></p>
                            <div><Link style={{color: '#e65c00'}} to="/createAccount">Sign Up</Link></div>
                            
                        </div>
                    </form>
                </div>
                <div className="socialMedia-div">
                    <h2><span>Or</span></h2>
                    
                    <button onClick={handleGoogleLogin} className="media-btn">Continue With Google</button>
                </div>
            </div>}
            {
                loggedInUser.email &&
                <div>
                    <h1>Successfully Logged In</h1>
                    <Link to='/home'>Home</Link>
                </div>
            }
        </div>
    );
};

export default Login;