import React, { Component } from 'react';
import Header from './Header'
import '../styles/EventsPage.scss'
import EventMap from './EventMap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import Comments from './Comments'
import EventRating from './EventRating';

class EventPage extends Component{
    constructor(props){
      super(props);
      this.state =
      {
        comments : [],
        pubTitle : this.props.location.state.pubTitle,
        pubCategory : this.props.location.state.pubCategory,
        pubDescription : this.props.location.state.pubDescription,
        pubStartTime : this.props.location.state.pubStartTime,
        pubEndTime : this.props.location.state.pubEndTime,
        pubAddress: this.props.location.state.pubAddress,
        pub_event_id : this.props.location.state.pub_event_id,
        user_id : this.props.location.state.user_id,
        event_type : this.props.location.state.event_type
      };

    }


    render(){

    return(

    <div id = "event">
          <Header/>
          <div className = "event-container">
            <div className = 'event-left'>
              <h1 className = "event-title"> {this.state.pubTitle} </h1>
               <h2 className = "event-time"> {moment(this.state.pubStartTime).format('LLL')} - {moment(this.state.pubEndTime).format('LLL')}</h2>
                <div>
                 <EventRating user_id = {this.state.user_id} event_id = {this.state.pub_event_id}/>
                </div>
              <div className = "event-content">
                  <div className = "event-conent-type">
                     {this.state.pubCategory}
                  </div>
                  <div className = "event-conent-description">
                   {this.state.pubDescription}
                  </div>
                  <section className = "event-content-map">
                    <EventMap/>
                  </section>
              </div>

            </div>
           
            <div className = "event-right">
              <Comments user_id = {this.state.user_id} pub_event_id = {this.state.pub_event_id} event_type = {this.state.event_type}/>
            </div>
          </div>
    </div>

    )

  }
 
}

export default EventPage
