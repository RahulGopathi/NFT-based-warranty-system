import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState('');

  const connectWallet = async (onConnected) => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    onConnected(accounts[0]);
    navigate('/customer-dashboard');
  };

  const checkIfWalletIsConnected = async (onConnected) => {
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
  };

  const contextData = {
    userWalletAddress,
    setUserWalletAddress,
    connectWallet,
  };

  useEffect(() => {
    checkIfWalletIsConnected(setUserWalletAddress);
    setLoading(false);
  }, []);

  return (
    <WalletContext.Provider value={contextData}>
      {loading ? null : children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
