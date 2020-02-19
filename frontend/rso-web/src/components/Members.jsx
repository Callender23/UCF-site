import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/Members.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'


const members = ['jimmy','jack','dude','shits on fire', 5 , 5 ,5  ,5 ,5, 5 ,5, 5 ]

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : this.props.user_id,
      admin_id : this.props.admin_id,
      rso_id : this.props.rso_id,
      membersList : [],
      user_idList : [],
      memberOrNot : false,
      email: ""
    }
    this.getMembersFromDB = this.getMembersFromDB.bind(this);
    this.joinRSO = this.joinRSO.bind(this);
    this.addMember = this.addMember.bind(this);
    this.joinRSOFetch = this.joinRSOFetch.bind(this);
    this.addMemberFetch = this.addMemberFetch.bind(this);

  }
  componentDidMount()
  {
    this.getMembersFromDB();
  }
  render() {
  return (
    <React.Fragment>

    <div class="table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-bordered mb-0">
            <thead>
                <tr>
                    <th scope="col">Members</th>
                </tr>
            </thead>
            <tbody className = "members-table-names">
                {(this.state.membersList).map(name => this.getMembers(name) )}
            </tbody>
        </table>
        </div>
    <div>
            {this.addMember()}
        </div>
    <div>
        {this.joinRSO()}
    </div>
    </React.Fragment>
  );
}

    getMembersFromDB()
    {
      var url = "https://groupoffive.azurewebsites.net/rsofollower/"
      var newUrl = url.concat(this.state.rso_id);
      var rows = [];
      var rows2 = [];

      fetch(newUrl,{
        method: 'GET',
        headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
      })
      .then(response => response.json())
      .then((result) => {
          for(var i = 0; i < result.length; i++)
          {
            rows.push(result[i].username);
            rows2.push(result[i].user_id);
          }
          this.setState({membersList : rows});
          this.setState({user_idList : rows2});
        })
        .catch(error => {
          console.log('Error',error);
        });
    }

    getMembers(name)
    {
        return(
            <tr>
            <td>{name}</td>
            </tr>
        )
    }

    addMember()
    {
      var notMember = true;
        for(var i = 0; i < this.state.user_idList.length; i++)
        {
          if( this.state.user_id === this.state.user_idList[i] ) {
              notMember = false;
          }
        }
        if( notMember && this.state.user_id !== this.state.admin_id)
        {
            return <Button variant="primary" size="sm" block onClick = {this.joinRSOFetch}> Join Organization </Button>
        }

    }

    joinRSO() {
        if( this.state.user_id === this.state.admin_id ) {
            return (
            <div>
                    <input type="email" placeholder="Enter email" className = "members-email-signup-feild" value = {this.state.email} onChange={evt => this.updateEmail(evt)}/>
                    <button variant="primary" type="submit" className = "members-email-signup-button" onClick = {this.addMemberFetch}  > Add Member </button>
          
            </div>)
        }

    }

    joinRSOFetch()
    {
      var url = "https://groupoffive.azurewebsites.net/rsofollower";
      url = url.concat("/" + this.state.rso_id )
      console.log(url)

      fetch(url,{
        method: 'POST',
        headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id : this.state.user_id
        })
      })
      .then(response => response.json())
      .then((result) => {
        alert("You have joined!");
        console.log(result);


        })
        .catch(error => {
          console.log('Error',error);
        });

    }

    addMemberFetch()
    {
      var url = "https://groupoffive.azurewebsites.net/adminadduser";
      url = url.concat("/" + this.state.rso_id)

      fetch(url,{
        method: 'POST',
        headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          email : this.state.email
        })
      })
      .then(response => response.json())
      .then((result) => {
        alert("Member Added!");
        console.log(result);


        })
        .catch(error => {
          console.log('Error',error);
        });

    }

    updateEmail(evt) {
      this.setState({
        email: evt.target.value
      });
    }

}

export default Members;
