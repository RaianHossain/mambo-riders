import React from 'react';
import Nav from '../Nav/Nav';
import './Home.css';
import moto from '../../images/Frame.png'
import car from '../../images/Frame-2.png'
import bus from '../../images/Frame-1.png'
import train from '../../images/Group.png'
import { Link } from 'react-router-dom';

const height = window.innerHeight

const Home = () => {
    return (
        <div style={{height: height}} className="outer-div">
            <div className="main-container">
            <Nav></Nav>
            <div className="home-container">
                <div className="box-container">
                    <Link to='/moto'>
                        <div className="box" id="moto">
                            <img src={moto} alt=""/>
                            <h5>Moto</h5>
                        </div></Link>
                    
                    <Link to='/car'>
                        <div className="box" id="car">
                            <img src={car} alt=""/>
                            <h5>Car</h5>
                        </div>
                    </Link>
                    
                    <div className="box" id="bus">
                        <img src={bus} alt=""/>
                        <h5>Bus</h5>
                    </div>
                    <div className="box" id="train">
                        <img src={train} alt=""/>
                        <h5>Train</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Home;