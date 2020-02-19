import React, { Component } from 'react';
import Members from './Members'
import Header from './Header'
import '../styles/Rso.scss'
import Button from 'react-bootstrap/Button'
import EventComponent from '../components/EventComponent'
import moment from 'moment';


class RsoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsoName : this.props.location.state.rsoName,
      rsoDescription : this.props.location.state.rsoDescription,
      rso_id : this.props.location.state.rso_id,
      admin_id : this.props.location.state.admin_id,
      user_id : this.props.location.state.user_id,
      rsoEvents : ""

    }
    this.getRSOEvents = this.getRSOEvents.bind(this)
    this.handleSubmitCreateEvent = this.handleSubmitCreateEvent.bind(this)
  }
componentDidMount()
{
  this.getRSOEvents();
  console.log(this.state.user_id);
  console.log(this.state.admin_id);
}

render(){
    return (
        <div id = "rso-page">
            <div className = "rso-page-header">
                <Header/>
            </div>

           <div className = "rso-page-container">
                <div className = "rso-page-left ">
                    <h1 className = 'rso-page-description'>{this.state.rsoName}</h1>
                    <p>
                        {this.state.rsoDescription}
                    </p>
                    <div>
                        {this.addEvent()}
                    </div>


                    <section className = "rso-page-events">
                    <div className = 'bigBad'>
                        <h1>Events</h1>
                        <div className = 'event-card'>
                            {this.state.rsoEvents}
                        </div>
                    </div>
                        {/*<EventComponent publicEvents = {this.state.rsoEvents}/>*/}
                    </section>

                </div>

                <section className = "rso-page-members rso-page-right">
                    <Members user_id = {this.state.user_id} admin_id = {this.state.admin_id} rso_id = {this.state.rso_id}/>
                </section>

          </div>

        </div>
    )


}

    addEvent(){

        if(this.state.user_id === this.state.admin_id ) {
        //if(1 === this.state.admin_id ) {
            return  <Button variant="primary" size="sm" block onClick = {this.handleSubmitCreateEvent}> Create Event </Button>
        }
    }

    getRSOEvents()
    {
      var url = "https://groupoffive.azurewebsites.net/getrsoevents/";
      var newUrl = url.concat(this.state.rso_id);
      var rows = [];

      fetch(newUrl,{
        method: 'GET',
        headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
      })
      .then(response => response.json())
      .then((result) => {
        for (let i = 0; i < result.length; i++)
        {
          rows.push(
            <div id = "event-card" onClick={() => {this.handleClick(result[i].title, result[i].category, result[i].description, result[i].starttime,
            result[i].endtime, result[i].address, result[i].rso_id , 3)}}>
                <div className = "event-title">{result[i].title}</div>
                <div className = "event-time">{moment(result[i].starttime).format('LLL')} - {moment(result[i].endtime).format("LLL")}</div>
                <div className = "event-location">{result[i].address}, {result[i].city} {result[i].state}, {result[i].postal_code}</div>
                <div className = "event-description">
                    <p>
                        {result[i].description }
                    </p>
                </div>
            </div>
          );

        }
        this.setState({rsoEvents : rows});
        console.log("rso events");
        console.log(result);
        })
        .catch(error => {
          console.log('Error',error);
        });
    }

    handleClick(title, category, description, starttime, endtime, address, rso_id, event_type) {

        this.props.history.push({
          pathname: '/EventPage',
          state: {pubTitle : title, pubCategory: category, pubDescription: description, pubStartTime: starttime, pubEndTime: endtime, pubAddress : address,
          pub_event_id : rso_id, user_id : this.state.user_id, event_type : event_type }
        });
    }

    handleSubmitCreateEvent() {
      this.props.history.push({
        pathname: '/RSOCreateEvent',
        state: { user_id: this.state.user_id, rso_id: this.state.rso_id }
      });
    }

}
export default RsoPage;
