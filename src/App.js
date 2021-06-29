import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './pages/auth/Login';
import Regeter from './pages/auth/Regester';
import Home from './pages/Home';
import Header from './components/nav/Header'
import RegistrationComplete from "./pages/auth/RegisterComplete"
import RegesterComplete from './pages/auth/RegisterComplete';
function App() {
  return (
    <>
    <Header/>
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/register' component={Regeter}></Route>
      <Route exact path='/register/complete' component={RegesterComplete}></Route>
    </Switch>
    </>
  );
}

export default App;
