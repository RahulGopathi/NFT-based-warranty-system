import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_AUTH_BASE_URL } from '../config';

const baseURL = API_AUTH_BASE_URL;
const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null); // eslint-disable-line
  const [loading, setLoading] = useState(true);
  const [userRegistered, setUserRegistered] = useState(false); // eslint-disable-line
  const [userWalletAddress, setUserWalletAddress] = useState(
    localStorage.getItem('userWalletAddress')
      ? localStorage.getItem('userWalletAddress')
      : ''
  );

  const ownerLogin = async () => {
    const response = await fetch(baseURL + '/owner/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet_address: userWalletAddress,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setUserRegistered(true);
      setCustomer(data);
    } else {
      navigate('/customer/register');
    }
  };

  const registerOwner = async (name, phone) => {
    const response = await fetch(baseURL + '/owner/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phno: phone,
        wallet_address: userWalletAddress,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 201) {
      setUserRegistered(true);
      setCustomer(data);
      navigate('/customer/dashboard');
    } else {
      throw data[Object.keys(data)[0]];
    }
  };

  const connectWallet = async (onConnected) => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts) {
        onConnected(accounts[0]);
        localStorage.setItem('userWalletAddress', accounts[0]);
        toast.success('Wallet Connected succesfully!');
        if (!localStorage.getItem('userWalletAddress')) {
          console.log('User not registered');
          ownerLogin();
          return;
        }
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
        localStorage.setItem('userWalletAddress', account);
        if (!localStorage.getItem('userWalletAddress')) {
          ownerLogin();
        }
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
    customer,
    registerOwner,
    userWalletAddress,
    setUserWalletAddress,
    connectWallet,
    disconnectWallet,
  };

  useEffect(() => {
    checkIfWalletIsConnected(setUserWalletAddress);
    setLoading(false);

    if (window.ethereum) {
      window.ethereum.on('disconnect', () => {
        console.log('disconnected');
        disconnectWallet();
      });
    }
  }, []); // eslint-disable-line

  return (
    <WalletContext.Provider value={contextData}>
      {loading ? null : children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
