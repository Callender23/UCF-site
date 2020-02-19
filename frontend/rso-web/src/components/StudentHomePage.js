import React, { Component } from 'react';
import '../styles/StudentHomePage.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import LeftSideBar from "./LeftSideBar"
import EventComponent from './EventComponent';
import EventMap from './EventMap';


class StudentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      user_id : this.props.location.state.user_id,
      publicEvents : "hi default"
    };
    //this.getPublicEvents = this.getPublicEvents.bind(this);
  }
  componentDidMount(){
    //this.getPublicEvents();
  }
  render() {
  return (
    <div id = "home-page">
        <section className = "home-page-sidebar">
          <LeftSideBar user_id = {this.state.user_id}/>
        </section>

        <section className = "home-page-map">
          <EventMap/>
        </section>

        <section className = "home-page-events">
          <EventComponent userId = {this.state.user_id}/>
        </section>

    </div>
  );
}

}

export default StudentHomePage;
