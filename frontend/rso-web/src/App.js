import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import LoginPage from "./components/LoginPage"
import StudentHomePage from "./components/StudentHomePage"
import SuperAdminHomePage from "./components/SuperAdminHomePage"
import EventCard from "./components/EventCard"
import Header from "./components/Header"
import EventComponent from './components/EventComponent'
import './components/Rso'
import Rso from './components/Rso'
import EventPage from './components/EventsPage'
import CreateEvent from './components/CreateEvent'
import RSOCreateEvent from './components/RSOCreateEvent'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage/>
        </Route>

        <Route exact path="/StudentHomePage" render={(props) => <StudentHomePage {...props}/>}>
        </Route>
          <Route exact path="/SuperAdminHomePage" render={(props) => <SuperAdminHomePage {...props}/>}>
          </Route>
            <Route exact path="/RSOPage" render={(props) => <Rso {...props}/>}>
        </Route>
        <Route exact path="/EventPage" render={(props) => <EventPage {...props}/>}>
        </Route>
        <Route exact path="/CreateEvent" render={(props) => <CreateEvent {...props}/>}>
        </Route>
        <Route exact path="/RSOCreateEvent" render={(props) => <RSOCreateEvent {...props}/>}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
