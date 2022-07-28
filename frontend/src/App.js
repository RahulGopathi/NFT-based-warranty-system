import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import { Toaster } from 'react-hot-toast';
import LandingPage from './views/LandingPage';
import CustomerDashboard from './views/customer/customerDashboard';
import RetailerLogin from './views/retailer/retailerLogin';
import RetailerDashboard from './views/retailer/retailerDashboard';
import RetailerSignup from './views/retailer/retailerSignup';
import CustomerProtectedRoute from './utils/customerProtected';
import RetailerProtectedRoute from './utils/retailerProtected';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <WalletProvider>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <div>
                    <Navbar />
                    <LandingPage />
                  </div>
                }
              />
              <Route
                path="/customer/dashboard"
                element={
                  <div>
                    <CustomerProtectedRoute>
                      <Navbar />
                      <CustomerDashboard />
                    </CustomerProtectedRoute>
                  </div>
                }
              />
              <Route
                path="/retailer/dashboard"
                element={
                  <div>
                    <RetailerProtectedRoute>
                      <Navbar />
                      <RetailerDashboard />
                    </RetailerProtectedRoute>
                  </div>
                }
              />
              <Route
                path="/retailer/login"
                element={
                  <div>
                    <Navbar />
                    <RetailerLogin />
                  </div>
                }
              />
              <Route
                path="/retailer/signup"
                element={
                  <div>
                    <Navbar />
                    <RetailerSignup />
                  </div>
                }
              />
            </Routes>
            <Toaster />
          </WalletProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
