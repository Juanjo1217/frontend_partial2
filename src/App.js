import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterUser from './registerUser';
import Login from './login';
import Homepage from './homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
