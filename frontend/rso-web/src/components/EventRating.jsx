import React, { Component } from 'react';
import BeautyStars from 'beauty-stars';

class EventRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : 0,
            user_id : this.props.user_id,
            event_id : this.props.event_id,
            userRated: false

          };
          this.getStars = this.getStars.bind(this)
          this.updateStarAverage = this.updateStarAverage.bind(this)
    }

    componentDidMount()
  {
    this.getStars()
  }
    render() {
        return (
          <BeautyStars
            value={this.state.value}
            size={'15px'}
            onChange={value => this.updateStarAverage(value)}
          />
        );
      }

    getStars(){

    }

    updateStarAverage(value){
      if(this.state.userRated === true)
        return


      this.setState({value: value})
      // console.log("the star value is here!")
      // console.log(value)
      // console.log("event ID!")
      // console.log(this.state.event_id)
      // console.log("the User ID is here!")
      // console.log(this.state.user_id)
    }
}

export default EventRating