import React, { Component } from 'react';
//import { BrowserRouter as Router , Switch, Route, Link } from 'react-router-dom';
import '../styles/SuperAdminHomePage.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import universities from "./universities";
import plus from '../assets/plus.png';
import { ButtonToolbar, Modal, Form } from 'react-bootstrap';

class SuperAdminHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModerateModal: false,
      showUniversityCreateModal: false,
      moderateEvents: [], 
      universities: [],
      university_name: "",
      university_description: "",
      university_num_of_students: "",
      university_address: "",
      university_city: "",
      university_state: "",
      university_lat: "",
      university_lon: "",
      university_postal_code: ""

    };
    this.handleShowModerateModal = this.handleShowModerateModal.bind(this)
    this.handleShowUniversityCreateModal = this.handleShowUniversityCreateModal.bind(this)
    this.basicHandleClose = this.basicHandleClose.bind(this)
    this.getUnapprovedEventsPublic = this.getUnapprovedEventsPublic.bind(this)
    this.getUnapprovedEventsPrivate = this.getUnapprovedEventsPrivate
    this.getUniversities = this.getUniversities.bind(this)
    this.approveEventPrivate = this.approveEventPrivate.bind(this)
    this.approveEventPublic = this.approveEventPublic.bind(this)
    this.handleSubmitCreateUniversity = this.handleSubmitCreateUniversity.bind(this)
    
  }

  componentDidMount(){
    this.getUnapprovedEventsPublic()
    this.getUnapprovedEventsPrivate()
    this.getUniversities()
  }

  render() {
  return (
    <div className = "bigContainer">
      <div class = "flex-container">

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="top" src={plus} fluid style={{width: '50%' , height: '50%'}}/>
               <Button variant="primary" onClick={this.handleShowUniversityCreateModal}>Add University </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="top" src={plus} fluid style={{width: '50%' , height: '50%'}}/>
            <Button variant="primary"onClick={this.handleShowModerateModal}>Moderate Events</Button>
          </Card.Body>
        </Card>
        
      </div>

        <Modal show={this.state.showUniversityCreateModal} onHide={this.basicHandleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create University</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <label for="inputAddress2">Name of University</label>
            <input type="text" class="form-control" placeholder = "" value = {this.state.university_name}  onChange={evt => this.updateUniversityName(evt)}/>
          </Form.Group>
          <Form.Group>
            <label for="exampleFormControlTextarea1">University Description</label>
            <textarea class="form-control" value = {this.state.university_description}  onChange={evt => this.updateUniversityDescription(evt)} rows="3"></textarea>
          </Form.Group>
          <Form.Group>
            <label for="inputAddress2">Numer of Students</label>
            <input type="number" class="form-control" value = {this.state.university_num_of_students}  onChange={evt => this.updateUniversityNumOfStudents(evt)} placeholder=""/>
          </Form.Group>
          <Form.Group>
            <label for="inputAddress2">Address</label>
            <input type="text" class="form-control" value = {this.state.university_address}  onChange={evt => this.updateUniversityAddress(evt)} placeholder=""/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" data-dismiss="Modal" onClick={this.basicHandleClose}>Close</Button>
          <Button variant="primary" onClick={this.handleSubmitCreateUniversity}>Create</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.showModerateModal} onHide={this.basicHandleClose} size = "xl">
        <Modal.Header closeButton>
          <Modal.Title>Unapproved Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {this.state.moderateEvents}
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" data-dismiss="Modal" onClick={this.basicHandleClose}>Close</Button>
          
        </Modal.Footer>
      </Modal>

      <div className = "university-container">
        {this.state.universities}
      </div>
      </div>
  );

}
handleShowModerateModal(){
  this.setState({showModerateModal: true})
}
handleShowUniversityCreateModal(){
  this.setState({showUniversityCreateModal : true});
}

basicHandleClose()
{
  this.setState({showModerateModal : false, showUniversityCreateModal: false});
}

getUnapprovedEventsPublic()
{

  var url = "https://groupoffive.azurewebsites.net/sapublicevents";
  var rows = this.state.moderateEvents;
  
    // GET PUBLIC EVENTS
    fetch(url,{
      method: 'GET',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    })
    .then(response => response.json())
    .then((result) => {
      
      if(result.length > 0 ){
        rows.push(
          <h1>
              Public Events
          </h1>
        )
      }
      
      for (let i = 0; i < result.length; i++)
      {
  
        rows.push(
          <div className = "unapproved-event-container">
                 <div className = "unapproved-event-title"> 
                    {result[i].title} 
                 </div>
                 <div className = "unapproved-event-button">
                   <Button variant = "success"  onClick = {this.approveEventPublic.bind(this, result[i].pub_event_id)} > Approve </Button>
                  </div>
          </div>
       )
  
      }
      this.setState({moderateEvents: rows})
      })
      .catch(error => {
        console.log('Error',error);
      });


    
     
}

getUnapprovedEventsPrivate(){
    
    //GET PRIVATE EVENTS
    let url = "https://groupoffive.azurewebsites.net/saprivateevents";
    let rows = this.state.moderateEvents
    fetch(url,{
      method: 'GET',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    })
    .then(response => response.json())
    .then((result) => {
      
      if(result.length > 0 ){
        rows.push(
          <h1>
              Private Events
          </h1>
        )
      }
      
      for (let i = 0; i < result.length; i++)
      {
  
        rows.push(
          <div className = "unapproved-event-container">
                 <div className = "unapproved-event-title"> 
                    {result[i].title} 
                 </div>
                 <div className = "unapproved-event-button">
                   <Button variant = "success"  onClick = {this.approveEventPrivate.bind(this, result[i].priv_event_id)} > Approve </Button>
                  </div>
          </div>
       )
  
      }
      this.setState({moderateEvents: rows})
      })
      .catch(error => {
        console.log('Error',error);
      });
}

  getUniversities()
  {
    var url = "https://groupoffive.azurewebsites.net/Universities";
    var rows = [];

    fetch(url,{
      method: 'GET',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    })
    .then(response => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++)
      {
  
      rows.push(
        <div class = "university-list">
          {result[i].name}
        </div>
      )
  
      }
      this.setState({universities : rows});
      })
      .catch(error => {
        console.log('Error',error);
      });


  }

  approveEventPublic(eventID){

    var url = "https://groupoffive.azurewebsites.net/sapublicevents"
    var url = url.concat("/" + eventID)
    console.log("kids approved")
    console.log(url)

    fetch(url,{
      method: 'PUT',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    })
    .then(response => response.json())
    .then((result) => {
     console.log("hit the delete button")
    
      })
      .catch(error => {
        console.log('Error',error);
      });

  }

  approveEventPrivate(eventID){

    var url = "https://groupoffive.azurewebsites.net/saprivateevents"
    var url = url.concat("/" + eventID)
    console.log("kids approved")
    console.log(url)

    fetch(url,{
      method: 'PUT',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    })
    .then(response => response.json())
    .then((result) => {
     console.log("hit the delete button")
    
      })
      .catch(error => {
        console.log('Error',error);
      });

  }

  handleSubmitCreateUniversity(){
    
    console.log(this.state.university_address)
    var url = "https://groupoffive.azurewebsites.net/sa"

    fetch(url,{
      method: 'POST',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name : this.state.university_name,
        description : this.state.university_description, 
        num_of_students : this.state.university_num_of_students,
        address: this.state.university_address,
        city : "orlando",
        state: "FL",
        lat: "lat", 
        lon: "lon",
        postal_code: "33431"

      })
    })
    
  }

  updateUniversityName(evt) {
    this.setState({
      university_name: evt.target.value
    });
  }

  updateUniversityDescription(evt) {
    this.setState({
      university_description: evt.target.value
    });
  }

  updateUniversityNumOfStudents(evt) {
    this.setState({
      university_num_of_students: evt.target.value
    });
  }

  updateUniversityAddress(evt) {
    this.setState({
      university_address: evt.target.value
    });
  }

  updateUniversityCity(evt) {
    this.setState({
      university_city: evt.target.value
    });
  }

  updateUniversityState(evt) {
    this.setState({
      university_state: evt.target.value
    });
  }

  updateUniversityLat(evt) {
    this.setState({
      university_lat: evt.target.value
    });
  }

  updateUniversityLon(evt) {
    this.setState({
      university_lon: evt.target.value
    });
  }

  updateUniversityPostalCode(evt) {
    this.setState({
      university_postal_code : evt.target.value
    });
  }
  

}

export default SuperAdminHomePage;
