import React, { Component } from 'react';
//import { BrowserRouter as Router , Switch, Route, Link } from 'react-router-dom';
import '../styles/CreateEvent.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header'
import { withRouter } from "react-router-dom";


class PublicEventDBO {
  constructor(rso_id, title, category, description, starttime, endtime, address, lat, lon) {
    this.rso_id = rso_id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.starttime = starttime;
    this.endtime = endtime;
    this.address = address;
    this.lat = lat;
    this.lon = lon;
  }
}



class RSOCreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        //user_id: this.props.location.state.user_id,
        user_id: this.props.location.state.user_id,
        rso_id: this.props.location.state.rso_id,
        eventType: "RSO",
      };
    this.handleSubmitCreateEvent = this.handleSubmitCreateEvent.bind(this);
    this.updateEventType = this.updateEventType.bind(this);
  }
  componentDidMount() {
    window.initialize();
  }
  render() {
    return (
      <div >
        <div className="rso-page-header">
          <Header />
        </div>
        <div id="formContainer" className="sideMargins">
          <h3>Create Event</h3>
          <div className="form-group">
            <label for="inputAddress2">Event Name</label>
            <input type="text" class="form-control" ref="eventName" placeholder="event name"/>
          </div>
          <div className="form-group">
            <label for="inputAddress2">Event Category</label>
            <input type="text" class="form-control" ref="eventCategory" placeholder="event category" />
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Event Description</label>
            <textarea class="form-control" ref="eventDescription" rows="3" placeholder="event description" ></textarea>
          </div>
          <div className="form-group">
            <label for="inputAddress2">Address</label>
            <input type="text" class="form-control" ref="eventAddress" id="searchTextField" placeholder="address" autocomplete="on" runat="server" />
            <input type="hidden" id="city2" name="city2" />
            <input type="hidden" id="cityLat" ref="lat" name="cityLat" />
            <input type="hidden" id="cityLng" ref="lon" name="cityLng" />
          </div>
          <div className="form-group">
            <label for="inputAddress2">Start Date</label>
            <input type="date" name="bday" min="1000-01-01" max="3000-12-31" class="form-control" ref="eventStartDate" placeholder="start date" />
          </div>
          <div className="form-group">
            <label for="inputAddress2">Start Time</label>
            <input type="time" class="form-control" ref="eventStartTime" placeholder="start time" />
          </div>
          <div className="form-group">
            <label for="inputAddress2">End Date</label>
            <input type="date" name="bday" min="1000-01-01" max="3000-12-31" class="form-control" ref="eventEndDate" placeholder="end date" />
          </div>
          <div className="form-group">
            <label for="inputAddress2">End Time</label>
            <input type="time" class="form-control" ref="eventEndTime" placeholder="end time" />
          </div>
          <div class="form-group">
            <label for="university">Event Type</label>
            <select id="university" class="form-control" onChange={this.updateEventType}>
              <option value="RSO">RSO</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <button type="button" class="btn btn-primary" onClick={this.handleSubmitCreateEvent}>Create</button>
        </div>
      </div>
    );
  }

  updateEventType(event) {
    this.setState({ eventType: event.target.value });
  }

  handleSubmitCreateEvent() {
    var url = "";
    var newUrl = "";
    var eventObject;
    var basic = this.refs.eventStartDate.value;
    var together = basic.concat(" ", this.refs.eventStartTime.value);
    //var together = basic.concat("T", this.refs.eventStartTime.value,":00");
    var basic2 = this.refs.eventEndDate.value;
    var together2 = basic2.concat(" ", this.refs.eventEndTime.value);
    if(this.state.eventType === "Public") {
      url = "https://groupoffive.azurewebsites.net/publicevent/";
      // newUrl = "https://localhost:5001/publicevent/1"
      newUrl = url.concat(this.state.user_id);
      eventObject = new PublicEventDBO(this.refs.eventName.value, this.refs.eventCategory.value,
    this.refs.eventDescription.value, together, together2, this.refs.eventAddress.value,
    this.refs.lat.value, this.refs.lon.value);
    }
    else if(this.state.eventType === "Private") {
      url = "https://groupoffive.azurewebsites.net/privateevent/";
      // newUrl = "https://localhost:5001/publicevent/1"
      newUrl = url.concat(this.state.user_id);
      eventObject = new PublicEventDBO(this.refs.eventName.value, this.refs.eventCategory.value,
    this.refs.eventDescription.value, together, together2, this.refs.eventAddress.value,
    this.refs.lat.value, this.refs.lon.value);
    }
    else {
      url = "https://groupoffive.azurewebsites.net/rsoevent/";
      // newUrl = "https://localhost:5001/publicevent/1"
      newUrl = url.concat(this.state.user_id);
      eventObject = new PublicEventDBO(this.state.rso_id, this.refs.eventName.value, this.refs.eventCategory.value,
    this.refs.eventDescription.value, together, together2, this.refs.eventAddress.value,
    this.refs.lat.value, this.refs.lon.value);
    }


    console.log(this.refs.eventEndTime.value);
    console.log(basic2);
    console.log(together2);

//var eventObject = new PublicEventDBO("are we in the server?", "Project", "Hope this shit works", "start", "end", "3900 Fudge St.", "Orlando", "FL", "-342.99", "3234.22", "34721");


  console.log(newUrl);
  console.log(eventObject);
  console.log(JSON.stringify(eventObject));
  console.log(typeof this.refs.eventName.value);
    console.log("MY DEBUG STATEMENT");
    console.log(eventObject);
    console.log(JSON.stringify(eventObject));
    //console.log(JSON.parse(this.eventObject));
    console.log("END OF DEBUG STATEMENT");

    fetch(newUrl, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(eventObject)
    }).then(response => {
      console.log(response);
      if(response.status === 200)
      {
        alert("Event Created");
        /*
        this.props.history.push({
          pathname: '/StudentHomePage',
          state: { user_id: this.state.user_id }
        })
        */
      }
    })
      .catch(error => {
        console.log(error)
      })
  }

}

export default withRouter(RSOCreateEvent);
