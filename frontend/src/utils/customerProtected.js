import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const CustomerProtectedRoute = ({ children }) => {
  let { userWalletAddress } = useContext(WalletContext);
  if (userWalletAddress) {
    return children;
  } else {
    toast.error('Please login as customer');
    return <Navigate to="/" />;
  }
};

export default CustomerProtectedRoute;
