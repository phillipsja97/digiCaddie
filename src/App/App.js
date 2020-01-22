import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Auth from '../Components/Pages/Auth/Auth';
import Home from '../Components/Pages/Home/Home';
import Courses from '../Components/Pages/Courses/Courses';
import EditComment from '../Components/Pages/EditComment/EditComment';
import AddComment from '../Components/Pages/AddComment/AddComment';
import SingleCourse from '../Components/Pages/SingleCourse/SingleCourse';
import SingleHole from '../Components/Pages/SingleHole/SingleHole';
import MyNavBar from '../Components/Shared/MyNavBar/MyNavBar';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConnection from '../Helpers/data/connection';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavBar authed={authed} />
            <Switch>
              <PublicRoute path="/auth" exact component={Auth} authed={authed}/>
              <PrivateRoute path="/" exact component={Home} authed={authed}/>
              <PrivateRoute path="/courses" exact component={Courses} authed={authed} />
              <PrivateRoute path="/course/:pathId" exact component={SingleCourse} authed={authed} />
              <PrivateRoute path="/course/:pathId/holeId" exact component={SingleHole} authed={authed} />
              <PrivateRoute path="/course/courseId/holeId/add" exact component={AddComment} authed={authed} />
              <PrivateRoute path="/course/courseId/holeId/commentId/edit" exact component={EditComment} authed={authed} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
