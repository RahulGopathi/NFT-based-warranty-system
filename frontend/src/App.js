import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import { Toaster } from 'react-hot-toast';
import LandingPage from './views/LandingPage';
import CustomerDashboard from './views/customer/customerDashboard';
import RetailerLogin from './views/retailer/retailerLogin';
import RetailerSignup from './views/retailer/retailerSignup';
import CustomerProtectedRoute from './utils/customerProtected';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <WalletProvider>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<LandingPage />} />
              <Route
                path="/customer-dashboard"
                element={
                  <div>
                    <CustomerProtectedRoute>
                      <CustomerDashboard />
                    </CustomerProtectedRoute>
                  </div>
                }
              />
              <Route path="/retailer-login" element={<RetailerLogin />} />
              <Route path="/retailer-signup" element={<RetailerSignup />} />
            </Routes>
            <Toaster />
          </WalletProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
