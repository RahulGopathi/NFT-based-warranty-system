import { useEffect, useState } from 'react';
import LandingPage from '../LandingPage';
import '../../App.css';

export async function connect(onConnected) {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

function Home() {
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  return (
    <>
      <div>
        {userAddress ? (
          <span>Connected to Adress: {userAddress}</span>
        ) : (
          <LandingPage setUserAddress={setUserAddress} />
        )}
      </div>
    </>
  );
}

export default Home;
