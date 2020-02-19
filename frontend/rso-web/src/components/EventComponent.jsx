import React, { Component } from 'react';
import EventCard from './EventCard'
import '../styles/EventComponent.scss'
import { get } from 'http';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import EventRating from './EventRating';
import FacebookButton from './FacebookButton'

class EventComponent extends Component{

  constructor(props) {
    super(props);
    this.state =
    {
      userId : this.props.userId,
      publicEvents: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.getPublicEvents = this.getPublicEvents.bind(this)
    this.getPrivateEvents = this.getPrivateEvents.bind(this)
  }

  componentDidMount()
  {

    this.getPublicEvents()
    this.getPrivateEvents()

  }
  render(){
    return (
      <div className = 'bigBad'>
          <h1>Events</h1>
          <div className = 'event-cord'>
              {this.state.publicEvents}
          </div>
      </div>
      )

  }

getPublicEvents()
{
  var url = "https://groupoffive.azurewebsites.net/publicevent";
  var rows = this.state.publicEvents;
  fetch(url,{
    method: 'GET',
    headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
  })
  .then(response => response.json())
  .then((result) => {
    for (let i = 0; i < result.length; i++)
    {
      rows.push(
        <div id = "event-card" onClick={() => {this.handleClick(result[i].title, result[i].category, result[i].description, result[i].starttime,
        result[i].endtime, result[i].address, result[i].pub_event_id, 1)}}>
            <div className = "event-rating" onClick={this.handleClickChild}><EventRating user_id = {this.state.userId} event_id = {result[i].pub_event_id}/></div>
            <div className = "event-title">{result[i].title}</div>
            <div className = "event-time">{moment(result[i].starttime).format('LLL')} - {moment(result[i].endtime).format('LLL')}</div>
            <div className = "event-location">{result[i].address}, {result[i].city} {result[i].state}, {result[i].postal_code}</div>
            <div className = "event-share" onClick={this.handleClickChild}>
              <FacebookButton event_id = {result[i].pub_event_id}/>
              </div>
            <div className = "event-description">
                <p>
                    {result[i].description}
                </p>
            </div>
        </div>
      );

    }
    //result.map(x =>  rows.push(<EventCard eventInfo = {x} />)  )
    this.setState({publicEvents : rows});
    })
    .catch(error => {
      console.log('Error',error);
    });

}

getPrivateEvents(){

  var url = "https://groupoffive.azurewebsites.net/privateevent";

  var rows = this.state.publicEvents;

  fetch(url,{
    method: 'POST',
    headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({
      user_id : this.state.userId,
    })
  })
  .then(response => response.json())
  .then((result) => {

    console.log("here is the result")
    console.log(result)
    for (let i = 0; i < result.length; i++)
    {

      rows.push(
        <div id = "event-card" onClick={() => {this.handleClick(result[i].title, result[i].category, result[i].description, result[i].starttime,
        result[i].endtime, result[i].address, result[i].priv_event_id , 2)}}>
            <div className = "event-rating" onClick={this.handleClickChild}><EventRating user_id = {this.state.userId} event_id = {result[i].priv_event_id}/></div>
            <div className = "event-title">{result[i].title}</div>
            <div className = "event-time">{moment(result[i].starttime).format('LLL')} - {moment(result[i].endtime).format('LLL')}</div>
            <div className = "event-location">{result[i].address}, {result[i].city} {result[i].state}, {result[i].postal_code}</div>
            <div className = "event-share" onClick={this.handleClickChild}>
              <FacebookButton event_id = {result[i].priv_event_id}/>

              </div>
            <div className = "event-description">
                <p>
                    {result[i].description}
                </p>
            </div>
        </div>
      );


    }
    //result.map(x =>  rows.push(<EventCard eventInfo = {x} />)  )
    this.setState({publicEvents : rows});
    })
    .catch(error => {
      console.log('Error',error);
    });
}

handleClickChild = e => {
  e.stopPropagation();
  return;
}

handleClick(title, category, description, starttime, endtime, address, pub_event_id, event_type, rating) {

  this.props.history.push({
    pathname: '/EventPage',
    state: {pubTitle : title, pubCategory: category, pubDescription: description, pubStartTime: starttime, pubEndTime: endtime, pubAddress : address,
    pub_event_id : pub_event_id, user_id : this.state.userId, event_type : event_type}
  });
}


}

export default withRouter (EventComponent);
