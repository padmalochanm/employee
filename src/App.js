import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from './pages/UserPage';
import NewUser from './Components/NewUser';
import UpdatePage from './pages/UpdatePage';
import ManagerPage from './pages/ManagerPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserPage/>} />
          <Route path="/newUser" element={<NewUser/>}/>
          <Route path="/update" element={<UpdatePage/>}/>
          <Route path="/manager" element={<ManagerPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
