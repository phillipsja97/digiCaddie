import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Auth from '../Components/Pages/Auth/Auth';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConnection from '../Helpers/data/connection';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeEventListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  render() {
    return (
      <div className="App">
      <Auth />
      </div>
    );
  }
}

export default App;
