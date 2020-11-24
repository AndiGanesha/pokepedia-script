import React from 'react';
import './App.css'
import NavBar from './components/layout/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/layout/Dashboard';
import Background from './pattern.png';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';
import Pokemon from './components/pokemon/Pokemon';
import MyList from './components/pokemon/MyList';

function App() {
  return (
    <Router>
      <div className='App' style={{background: `url(${Background})`}}>
        <NavBar />
        <div className='container'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/pokemon/:pokemonIndex' component={Pokemon} />
          <Route exact path='/mypokemonlist/' component={MyList} />
          <Redirect from='/' to='/mypokemonlist' />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

/*import React,  { useState } from 'react';
import Modal from './components/layout/Modal';
import './App.css';

function App() {
  const [status, setStatus] = useState(false);
  return (
    <div>
         { status && (<Modal closeModal={() => setStatus(false)}> <p>The content of the modal</p></Modal>)}
        <div className="container">
        <h2>This is the page content</h2>
        <button onClick={() => setStatus(true)}>Open Modal</button>
        </div>

    </div>
  );
}

export default App;*/

/*import React, { useState } from 'react';
import { Modal } from './components/layout/Modal';

function App() {
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);

  return (
    <div>
      { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
      <button onClick={() => setShow(true)} className="btn-openModal">Open Modal</button>
      <Modal show={show} close={closeModalHandler} />
    </div>
  );
}

export default App;*/
