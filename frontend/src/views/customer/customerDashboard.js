import { useContext } from 'react';
import '../../App.css';
import { WalletContext } from '../../contexts/WalletContext';

function CustomerDashboard() {
  const { userWalletAddress } = useContext(WalletContext);

  return (
    <>
      <div>
        <span>Connected to Adress: {userWalletAddress}</span>
      </div>
    </>
  );
}

export default CustomerDashboard;
