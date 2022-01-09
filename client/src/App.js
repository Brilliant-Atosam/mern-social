import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {user ? <Home /> : <Register />}
        </Route>
      </Switch>
      <Switch>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
      </Switch>
      <Switch>
        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
      </Switch>
      <Switch>
        <Route path='/profile/:username'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
