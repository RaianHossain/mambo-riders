import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Nav.css';

const Nav = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="nav-main-div">
            <h2>Mambo Riders</h2>
            <nav>
                <ul>
                    <li>
                    <Link to="/home" style={{ textDecoration: 'none' }}>Home</Link>
                    </li>
                    <li>
                    <Link to="/destination" style={{ textDecoration: 'none' }}>Destination</Link>
                    </li>
                    <li>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>Contact</Link>
                    </li>
                    <li>
                    <Link to="/blog" style={{ textDecoration: 'none' }}>Blog</Link>
                    </li>
                    {!loggedInUser.email && <li id="login-btn">
                    <Link id="login-color" to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                    </li>}
                    {loggedInUser.email &&
                        <li>{loggedInUser.email}</li>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Nav;