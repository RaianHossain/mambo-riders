import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import motoImage from '../../images/Frame.png'
import carImage from '../../images/Frame-2.png'

const Destination = () => {
    return (
        <div className="main-container">
            <Nav></Nav>
            <div>
                <h1>Chose Your vehicle</h1>
                <Link to='/moto'>
                    <img src={motoImage} alt="" width="150px"/>
                    <h4>Motorcycle for 1 person</h4>
                </Link>
                <Link to='/car'>
                    <img src={carImage} alt="" width="150px"/>
                    <h4>Car for 4 persons</h4>
                </Link>
            </div>
        </div>
    );
};

export default Destination;