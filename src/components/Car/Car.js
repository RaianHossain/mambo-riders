import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import './Car.css';
import map from '../../images/Map.png'
import cars from '../../fakeData/car.json'
import FoundCars from '../FoundCars/FoundCars';

const Car = () => {
//    console.log(cars);
    const [found, setFound] = useState([])
    const [data, setData] = useState([]);
    
    
    useEffect(() => {
        setData(cars);
    }, [])

    let carsOnLoc, pickFrom, pickTo;
    const handleBlur = (e) => {
        if(e.target.name == "pickFrom"){
            pickFrom = e.target.value;
            carsOnLoc = data.filter(car => car.location == e.target.value)
        }
              
    }
    // console.log(location);
    const handleSubmit = (e) => {
      setFound(carsOnLoc)
    //   console.log(found);
    }
    
    
    return (
        <div className="main-container">
            <Nav></Nav>
            <hr/>
            <div className='body-div'>
                {found?.length == 0 &&
                    <div className='locform-div'>
                        <div className='locInner-div'>
                            <p>Pick From</p>
                            <TextField name="pickFrom" onBlur={handleBlur} style={{backgroundColor:"white", borderRadius:"5px"}}  label="Area" variant="outlined" fullWidth />
                            <p>Pick To</p>
                            <TextField onBlur={handleBlur}  name="pickTo" style={{backgroundColor:"white", borderRadius:"5px"}}  label="Area" variant="outlined" fullWidth />
                            <br/><br/>
                            <button onClick={handleSubmit} style={{borderRadius:"5px", border:"none"}} className="submit-btn">Search</button>
                            
                        </div>
                    </div>
                }
                {
                        found?.length>0 && 
                        <div className='loc-div'>
                            <div className='locInner-div'>
                                <div className="loc">
                                    <p>From: {found[0].location}</p>
                                    <hr/>
                                    <p>To: {pickTo}</p>
                                </div>
                                <div classname='cars-div'>
                                    {found.map(cr => <FoundCars cr= {cr}></FoundCars>)} 
                                </div>
                            </div>
                        </div>
                        }
                <div className="map-div">
                    <img src={map} alt=""/>
                </div>

            </div>
        </div>
    );
};

export default Car;