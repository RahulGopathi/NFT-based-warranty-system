import { useRef, useEffect, useContext } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import './LandingPage.css';
// import Navbar from '../components/Navbar';
import { WalletContext } from '../contexts/WalletContext';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const videoRef = useRef();

  const { userWalletAddress, setUserWalletAddress, connectWallet } =
    useContext(WalletContext);

  const redirectCustomer = () => {
    if (userWalletAddress) {
      navigate('/customer-dashboard');
    } else {
      connectWallet(setUserWalletAddress);
    }
  };

  useEffect(() => {
    videoRef.current.playbackRate = 0.6;
  });

  return (
    <div className="landing-page">
      {/* <Navbar /> */}
      <video src="/landing-video.mp4" ref={videoRef} autoPlay loop muted />
      <div className="hero-container">
        <h1>Prove Your</h1>
        <h2>Digital Ownership</h2>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={redirectCustomer}
          >
            CUSTOMER <i className="fa-solid fa-angle-right"></i>
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to="/retailer-login"
            >
              RETAILER <i className="fa-solid fa-angle-right"></i>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
