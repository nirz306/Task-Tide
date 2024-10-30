import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './components/Create';
import TaskDetails from './components/TaskDetails';
import NotFound from "./components/NotFound";
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content flex flex-col mx-auto w-max justify-center">
          <div className='block'><Navbar /></div>
          <hr style={{ width: '100%', margin: '0 auto' }} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/task/:id" element={<TaskDetails />} /> {/* Task details route */}
            
            {/* <Route path="/tasks/:id" element={<
             />} /> */}
            {/* This Route should be the last one to catch all unmatched paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
