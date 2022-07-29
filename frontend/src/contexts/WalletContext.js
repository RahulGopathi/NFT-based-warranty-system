import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState(
    localStorage.getItem('userWalletAddress')
      ? localStorage.getItem('userWalletAddress')
      : ''
  );

  const connectWallet = async (onConnected) => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts) {
        onConnected(accounts[0]);
        localStorage.setItem('userWalletAddress', accounts[0]);
        toast.success('Wallet Connected succesfully!');
        navigate('/customer/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  const disconnectWallet = async () => {
    try {
      localStorage.removeItem('userWalletAddress');
      setUserWalletAddress('');
      toast.success('Logged Out succesfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const contextData = {
    userWalletAddress,
    setUserWalletAddress,
    connectWallet,
    disconnectWallet,
  };

  useEffect(() => {
    checkIfWalletIsConnected(setUserWalletAddress);
    setLoading(false);
  }, []); // eslint-disable-line

  return (
    <WalletContext.Provider value={contextData}>
      {loading ? null : children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
