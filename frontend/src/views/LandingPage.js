import { useRef, useEffect } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import './LandingPage.css';
import Navbar from '../components/Navbar';
import { connect } from './customer/Home';

function LandingPage(props) {

  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.playbackRate = 0.6;
  })

  return (
    <div className="landing-page">
      <Navbar setUserAddress={props.setUserAddress} />
      <video src='/landing-video.mp4' ref={videoRef} autoPlay loop muted />
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
            CUSTOMER <i className="fa-solid fa-angle-right"></i>
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            RETAILER <i className="fa-solid fa-angle-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;