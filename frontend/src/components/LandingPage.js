import React from 'react';
import '../App.css';
import { Button } from './Button';
import './LandingPage.css';
import Navbar from './Navbar';
import { connect } from './Home';

function LandingPage(props) {
  return (
    <div class="landing-page">
        <Navbar setUserAddress={props.setUserAddress}/>
        <video src='/landing-video.mp4' autoPlay loop muted />
        <div className='hero-container'>
            <h1>Prove Your</h1>
            <h2>Digital Ownership</h2>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Button
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                onClick={() => connect(props.setUserAddress)}
                >
                CUSTOMER <i class="fa-solid fa-angle-right"></i>
                </Button>
                <Button
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
                onClick={console.log('hey')}
                >
                RETAILER <i class="fa-solid fa-angle-right"></i>
                </Button>
            </div>
        </div>
    </div>
  );
}

export default LandingPage;