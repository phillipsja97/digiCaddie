import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './MyNavBar.scss';

class MyNavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { authed } = this.props;
    const buildNavBar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-danger" onClick={this.logMeOut}>Logout</button>
            </li>
          </ul>
        );
      }
      return (<ul className="navbar-nav ml-auto"></ul>);
    };
    return (
      <div className="MyNavbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img src="https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/caddie.png?raw=true" className="brand" alt="logo" />
      </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          { buildNavBar() }
        </div>
        <div>
        { (authed) ? (
         <ul className="navbar-nav ml-auto"></ul>
        )
          : (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <button className="loginButton" onClick={this.loginClickEvent}><img src="https://res.cloudinary.com/holiday-images/image/upload/v1569859896/google-sign-in_v3yhxi.png" className="loginButtonImage" alt="login button"/></button>
                </li>
            </ul>)
        }
        </div>
     </nav>
   </div>
    );
  }
}

export default MyNavBar;
