import React from 'react';
import motoImage from '../../images/Frame.png';
import './FoundMotos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';

const FoundCars = (props) => {
    const car = props.cr;
    
    return (
        <div className="carBox">
            <div>
            <img src={motoImage} alt="" width="50px"/>
            <p>Car<FontAwesomeIcon icon={faUser}></FontAwesomeIcon> 4</p>
            </div>            
            
            <p>$65</p>
        </div>
    );
};

export default FoundCars;