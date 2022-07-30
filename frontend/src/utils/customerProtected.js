import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';

const CustomerProtectedRoute = ({ children }) => {
  let { customer, ownerLogin } = useContext(WalletContext);
  if (customer) {
    return children;
  } else {
    ownerLogin();
    return <Navigate to="/" />;
  }
};

export default CustomerProtectedRoute;
