import { useEffect, useState } from 'react';

async function connect(onConnected) {
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
    <div>
      <h1>PyDO</h1>

      {userAddress ? (
        <span>Connected to Adress: {userAddress}</span>
      ) : (
        <button onClick={() => connect(setUserAddress)}>
          Connect to MetaMask
        </button>
      )}
    </div>
  );
}

export default Home;
