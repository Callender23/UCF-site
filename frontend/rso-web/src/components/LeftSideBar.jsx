import React, { Component } from 'react';
//import { BrowserRouter as Router , Switch, Route, Link } from 'react-router-dom';
import '../styles/LeftSideBar.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/ucfLogoTransparent.png";
import { Button, ButtonToolbar, Modal, Form, } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        showCreateRSO: false,
        showCreateEvent: false,
        showJoinRSO: false,
        joinRSOs: "",
        user_id: this.props.user_id
      };
    this.handleShowCreateRSO = this.handleShowCreateRSO.bind(this);
    this.handleShowCreateEvent = this.handleShowCreateEvent.bind(this);
    this.handleShowJoinRSO = this.handleShowJoinRSO.bind(this);

    this.basicHandleClose = this.basicHandleClose.bind(this);
    this.handleSubmitCreateRSO = this.handleSubmitCreateRSO.bind(this);
    this.handleSubmitCreateEvent = this.handleSubmitCreateEvent.bind(this);

    this.getJoinRSOs = this.getJoinRSOs.bind(this);
    this.goToRSOPage = this.goToRSOPage.bind(this);

  }
  componentDidMount() {
    this.getJoinRSOs();
  }
  render() {
    return (
      <div id="left-sidebar">
        <img className="logoStyle" src={Logo} alt="logo" />
        <div>
          <button type="button" class="btn btn-primary buttonMargin" onClick={this.handleShowJoinRSO}>Search RSO</button>
        </div>
        <div>
          <button type="button" class="btn btn-primary buttonMargin" onClick={this.handleShowCreateRSO}>Create RSO</button>
        </div>
        <div>
          <button type="button" class="btn btn-primary buttonMargin" onClick={this.handleSubmitCreateEvent}>Create Event</button>
        </div>

        <Modal show={this.state.showCreateRSO} onHide={this.basicHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Student Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <label for="inputAddress2">Name of the RSO</label>
              <input type="text" class="form-control" ref="rsoName" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label for="exampleFormControlTextarea1">RSO Description</label>
              <textarea class="form-control" ref="RSODescription" rows="3"></textarea>
            </Form.Group>
            <Form.Group>
              <label for="inputAddress2">Student Email #1</label>
              <input type="text" class="form-control" ref="studentEmail1" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label for="inputAddress2">Student Email #2</label>
              <input type="text" class="form-control" ref="studentEmail2" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label for="inputAddress2">Student Email #3</label>
              <input type="text" class="form-control" ref="studentEmail3" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label for="inputAddress2">Student Email #4</label>
              <input type="text" class="form-control" ref="studentEmail4" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label for="inputAddress2">Student Email #5</label>
              <input type="text" class="form-control" ref="studentEmail5" placeholder="" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" data-dismiss="Modal" onClick={this.basicHandleClose}>Close</Button>
            <Button variant="primary" onClick={this.handleSubmitCreateRSO}>Create</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showJoinRSO} onHide={this.basicHandleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Join Student Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.joinRSOs}
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" data-dismiss="Modal" onClick={this.basicHandleClose}>Close</Button>
            <Button variant="primary" onClick={this.basicHandleClose}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
  handleSubmitCreateRSO() {
    var url = "https://groupoffive.azurewebsites.net/CreateRSO"
    url = url.concat("/" + this.state.user_id);
    console.log(
      JSON.stringify({
        user_id: this.state.user_id,
        name: this.refs.rsoName.value,
        description: this.refs.RSODescription.value,
        studentEmail1: this.refs.studentEmail1.value,
        studentEmail2: this.refs.studentEmail2.value,
        studentEmail3: this.refs.studentEmail3.value,
        studentEmail4: this.refs.studentEmail4.value,
        studentEmail5: this.refs.studentEmail5.value,
      })
    );
    fetch(url, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.refs.rsoName.value,
        description: this.refs.RSODescription.value,
        studentEmail1: this.refs.studentEmail1.value,
        studentEmail2: this.refs.studentEmail2.value,
        studentEmail3: this.refs.studentEmail3.value,
        studentEmail4: this.refs.studentEmail4.value,
        studentEmail5: this.refs.studentEmail5.value,
      })
    })
      .then(response => console.log(response))
      .then(response => {
        console.log(response);
        this.setState({ showCreateRSO: false });
        alert("RSO created!");

      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  handleSubmitCreateEvent() {
    this.props.history.push({
      pathname: '/CreateEvent',
      state: { user_id: this.state.user_id }
    });
  }

  getJoinRSOs() {
    var url = "https://groupoffive.azurewebsites.net/rsouniversity/";
    var newUrl = url.concat(this.state.user_id);
    var rows = [];
    fetch(newUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
      .then(response => response.json())
      .then((result) => {
        for (let i = 0; i < result.length; i++) {

          rows.push(
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">{result[i].name}</h5>
                <p class="card-text">{result[i].description}</p>
                <button type="button" class="btn btn-primary buttonMargin" onClick={() => { this.goToRSOPage(result[i].name, result[i].description, result[i].rso_id, result[i].user_id, this.state.user_id) }}>Go to RSO Page</button>
              </div>
            </div>
          );

        }
        this.setState({ joinRSOs: rows });
        // console.log(this.state.joinRSOs);
      })
      .catch(error => {
        console.log('Error', error);
      });

  }

  goToRSOPage(name, description, rsoID, adminID, userID) {
    this.props.history.push({
      pathname: '/RSOPage',
      state: { rsoName: name, rsoDescription: description, rso_id: rsoID, admin_id: adminID, user_id: userID }
    });
  }

  basicHandleClose() {
    this.setState({ showCreateRSO: false, showCreateEvent: false, showJoinRSO: false });
  }

  handleShowCreateRSO() {
    this.setState({ showCreateRSO: true });
  }

  handleShowCreateEvent() {
    this.setState({ showCreateEvent: true });
  }

  handleShowJoinRSO() {
    this.setState({ showJoinRSO: true });
  }
}

export default withRouter(LeftSideBar);
