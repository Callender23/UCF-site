import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      email : "",
      password : "",
      registerEmail : "",
      registerPassword : "",
      registerUsername : "",
      registerUniversity : "",
      superAdminEmail : "",
      superAdminPassword : "",
      data: ""
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateRegisterEmail = this.updateRegisterEmail.bind(this);
    this.updateRegisterPassword = this.updateRegisterPassword.bind(this);
    this.updateRegisterUsername = this.updateRegisterUsername.bind(this);
    this.updateSuperAdminEmail = this.updateSuperAdminEmail.bind(this);
    this.updateSuperAdminPassword = this.updateSuperAdminPassword.bind(this);
    this.updateRegisterUniversity = this.updateRegisterUniversity.bind(this);

    this.studentLogin = this.studentLogin.bind(this);
    this.studentRegister = this.studentRegister.bind(this);
    this.superAdminLogin = this.superAdminLogin.bind(this);
    this.getUniversities = this.getUniversities.bind(this);

  }

  componentDidMount(){
    this.getUniversities();
  }
  render() {
    return (
      <React.Fragment>
      <div className = "background">
      <div className = "registerBox">
      <div ref ="login">
        <h3 className = "registerHeader">Student Login</h3>
        <div className = "form">
        <form>
          <div class="form-group">
            <label for="inputAddress">Email</label>
            <input type="text" class="form-control" onChange = {this.updateEmail} placeholder="email"/>
          </div>
          <div class="form-group">
            <label for="inputAddress2">Password</label>
            <input type="password" class="form-control" onChange = {this.updatePassword} placeholder="password"/>
          </div>
          <div className = "center">
          <button type="button" class = "btn btn-primary" onClick = {this.studentLogin}>Login</button>
          </div>
          <div className = "center alreadyAccountBtn">
          <button type="button" class="btn btn-link" onClick={this.swap1.bind(this)}>New User? Register Here</button>
          </div>
          <div className = "center alreadyAccountBtn">
          <button type="button" class="btn btn-link" onClick={this.swap4.bind(this)}>Super Admin? Log In Here</button>
          </div>
        </form>
        </div>
        </div>

        <div ref="register" className = "disp">
          <h3 className = "registerHeader">Student Register</h3>
          <div className = "form">
          <form>
            <div class="form-group">
              <label for="inputAddress">Email</label>
              <input type="text" class="form-control" onChange = {this.updateRegisterEmail} placeholder="email"/>
            </div>
            <div class="form-group">
              <label for="inputAddress2">Password</label>
              <input type="password" class="form-control" onChange = {this.updateRegisterPassword} placeholder="password"/>
            </div>
            <div class="form-group">
              <label for="inputAddress3">Username</label>
              <input type="text" class="form-control" onChange = {this.updateRegisterUsername} placeholder="username"/>
            </div>
            <div class="form-group">
              <label for="university">University</label>
              <select id="university" class="form-control" onChange = {this.updateRegisterUniversity}>
                {this.state.data}
              </select>
            </div>
            <div className = "center">
            <button type="button" class = "btn btn-primary" onClick = {this.studentRegister}>Register</button>
            </div>
            <div className = "center alreadyAccountBtn">
            <button type="button" class="btn btn-link" onClick={this.swap2.bind(this)}>Already have an account? Click here</button>
            </div>
            </form>
          </div>
        </div>

        <div ref="superAdmin" className = "disp">
          <h3 className = "registerHeader">Super Admin Login</h3>
          <div className = "form">
          <form>
            <div class="form-group">
              <label for="inputAddress">Email</label>
              <input type="text" class="form-control" onChange = {this.updateSuperAdminEmail} placeholder="email"/>
            </div>
            <div class="form-group">
              <label for="inputAddress2">Password</label>
              <input type="password" class="form-control" onChange = {this.updateSuperAdminPassword} placeholder="password"/>
            </div>
            <div className = "center">
            <button type="button" class = "btn btn-primary" onClick = {this.superAdminLogin}>Login</button>
            </div>
            <div className = "center alreadyAccountBtn">
            <button type="button" class="btn btn-link" onClick={this.swap3.bind(this)}>Student Log In? Click here</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </React.Fragment>
    );
  }

  swap1()
  {
    this.refs.register.style.display = "block";
    this.refs.login.style.display = "none";
  }

  swap2()
  {
    this.refs.register.style.display = "none";
    this.refs.login.style.display = "block";
  }

  swap3()
  {
    this.refs.login.style.display = "block";
    this.refs.superAdmin.style.display = "none";
  }

  swap4()
  {
    this.refs.login.style.display = "none";
    this.refs.superAdmin.style.display = "block";
  }

  updateEmail(event)
  {
    this.setState({email : event.target.value})
  }

  updatePassword(event)
  {
    this.setState({password : event.target.value})
  }

  updateRegisterUsername(event)
  {
    this.setState({registerUsername : event.target.value})
  }

  updateRegisterPassword(event)
  {
    this.setState({registerPassword : event.target.value})
  }

  updateRegisterEmail(event)
  {
    this.setState({registerEmail : event.target.value})
  }

  updateSuperAdminEmail(event)
  {
    this.setState({superAdminEmail : event.target.value})
  }

  updateSuperAdminPassword(event)
  {
    this.setState({superAdminPassword : event.target.value})
  }

  updateRegisterUniversity(event)
  {
    this.setState({registerUniversity : event.target.value})
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
      for (var i = 0; i < result.length; i++)
      {

        rows.push(<option key={i} value = {result[i].name}>{result[i].name}</option>);
      }
      this.setState({data : rows, registerUniversity : result[0].name});
      console.log(this.state.data);
      })
      .catch(error => {
        console.log('Error',error);
      });


  }

  studentLogin()
  {
    var url = "https://groupoffive.azurewebsites.net/Login"

    fetch(url,{
      method: 'POST',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email : this.state.email,
        password : this.state.password
      })
    })
    .then(response => response.json())
    .then((result) => {
      console.log("result is " + result);
      if( result === "Email/Password error." )
      {
        alert("Incorrect Email and Password Combination!");
        return;
      }
      else {
        console.log("user id is");
        console.log(result);
        this.props.history.push({
          pathname: '/StudentHomePage',
          state: { user_id: result }
        })
      }


      })
      .catch(error => {
        console.log('Error',error);
      });

  }

  studentRegister()
  {
    var url = "https://groupoffive.azurewebsites.net/Signup"

    fetch(url,{
      method: 'POST',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        username : this.state.registerUsername,
        email : this.state.registerEmail,
        password : this.state.registerPassword,
        university : this.state.registerUniversity

      })
    })
    .then(response => response.json())
    .then((result) => {
        alert("Account created! you can log in now");
        console.log(result);
        //If register works we can try this code so they can login without going back to login screen
        /*
        this.setState({email : this.state.registerEmail})
        this.setState({password : this.state.registerPassword})
        studentlogin()
        */
      })
      .catch(error => {
        console.log('Error',error);
      });
  }

  superAdminLogin()
  {


    if(this.state.superAdminEmail === "sa@example.com")
    {
    var url = "https://groupoffive.azurewebsites.net/Login"

    fetch(url,{
      method: 'POST',
      headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email : this.state.superAdminEmail,
        password : this.state.superAdminPassword
      })
    })
    .then(response => response.json())
    .then((result) => {
      if( result === "Email/Password error." )
      {
        alert("Incorrect Email and Password Combination!");
        return;
      }
      else {
        console.log("user id is");
        console.log(result);
        this.props.history.push({
          pathname: '/SuperAdminHomePage',
          state: { sa_id: result }
        })
      }
      })
      .catch(error => {
        console.log('Error',error);
      });
    }
    else {
      alert("Incorrect Email and Password Combination!");
      return;
    }
  }

}

export default withRouter (LoginPage);
