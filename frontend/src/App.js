import Home from './components/Home';
import Install from './components/Install';
import './App.css';

function App() {
  if (window.ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
