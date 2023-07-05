import './App.css'
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MultiForm from './components/MultiForm';
import ForgetPassword from './components/ForgetPassword';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/multiform" element={<MultiForm />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
