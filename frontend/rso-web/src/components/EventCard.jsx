import React, { Component } from 'react';
import '../styles/EventCard.scss';
import { withRouter } from 'react-router-dom'
// import history from "/your/history/path"
import { useHistory } from "react-router-dom";


class EventCard extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            prev : this.props.eventInfo
        };
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        //this.handleClick()
        // console.log('can it reach that point')
        // console.log(this.props.eventInfo)
    }
  
    //let history = useHistory();

    render(){
    return (
        <div id = "event-card" onClick={ this.handleClick}>
            <div className = "event-title">{this.state.prev.title}</div>
            <div className = "event-time">{this.props.eventInfo.starttime} - {this.props.eventInfo.endtime}</div>
            <div className = "event-location">{this.state.prev.address}, {this.props.eventInfo.city} {this.props.eventInfo.state}, {this.props.eventInfo.postal_code}</div>
            <div className = "event-description"> 
                <p>
                    {this.props.eventInfo.description }   
                </p>
            </div>
        </div> 
       
    )
    }
    handleClick(value) {
        console.log(this.props.eventInfo.description)
        //return 'hello'
        //history.push("/eventPage")
    }

}



// function EventCall(value) {
//     let history = useHistory();
//     // console.log(value)
//     // return console.log('hello')
//     // this.history.push
//     history.push("/eventPage");

// }

export default EventCard;