import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import db from "./db";

class EventMap extends Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedMarker: {},
            events : [],
          };

        this.onClick = this.onClickMarker.bind(this);
        this.onClose = this.onCloseInfoWin.bind(this);
        //this.getMarkers = this.getMarkers.bind(this);
    }

    static defaultProps = {
        center: {
          lat: 28.602427,
          lng: -81.200058
        },
        zoom: 14,
    };

    onClickMarker = (props, marker, e) => {
        this.setState({
        selectedMarker: this.state.events[props.eventIndex],
        activeMarker: marker,
        showingInfoWindow: true
    });
    };

    onCloseInfoWin = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            });
        }
    };

    componentDidMount()
    {
      this.getMarkers();
      // Uncomment below and comment above to test with more markers
      //this.setState({events : db});
    }

    render(){
        return (
          <React.Fragment>
            <Map
                google={this.props.google}
                zoom={this.props.zoom}
                initialCenter={this.props.center}
                draggable={true}
                scrollwheel={true}
                onClick={this.onCloseInfoWin}
            >

            {this.state.events.map((loc, i) => {
                return (
                    <Marker
                        onClick={this.onClickMarker}
                        position={{"lat": loc.lat, "lng": loc.lon}}
                        title={loc.title}
                        address={loc.address}
                        eventIndex={i}
                    />
                );
            })}

            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}

            >
                <h6>{this.state.selectedMarker.title}</h6>
                <div>{this.state.selectedMarker.description}</div>
            </InfoWindow>
            </Map>
            </React.Fragment>
        );
    }

    getMarkers()
    {
      var url = 'https://groupoffive.azurewebsites.net/publicevent/';

      fetch(url,{
        method: 'GET',
        headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
      })
      .then(response => response.json())
      .then((result) => {
        this.setState({events : result});
        })
        .catch(error => {
          console.log('Error',error);
        });
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDQruXXTHKjjf3wWhFCtTu-UWQLdkeaJ8w'
})(EventMap);
