import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './TaskDetails';
import TaskDetails from './TaskDetails';
import NotFound from "./NotFound";

function App() {
  // const title = 'To do List';

  return (
    <Router>
    <div className="App">
      <div className="content flex flex-col  mx-auto w-max justify-center">
        <div className='block'><Navbar/></div>
   
        <hr style={{ width: '100%', margin: '0 auto' }} />
        <Switch>

          <Route exact path="/">
            <div><Home/></div>
          </Route>

          <Route  path="/create">
            <Create/>
          </Route>

          <Route  path="/tasks/:id">
            <TaskDetails/>
          </Route>

          <Route>
            <Route path = "*">
              <NotFound/>
            </Route>
          </Route>          
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
