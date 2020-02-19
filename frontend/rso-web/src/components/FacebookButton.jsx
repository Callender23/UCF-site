import React, { Component} from 'react';
import { FacebookIcon, FacebookShareButton, FacebookShareCount} from 'react-share'

class FacebookButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // event_id : this.props.event_id
            event_id : this.props.event_id
          };

    }

    render() {
        
        let url = 'http://partneroffive.com/eventpage';
        url = url.concat("?" + this.state.event_id)

        return (
            <div>
                <FacebookShareButton
                    url={url}>
                <FacebookIcon size={32} round />
                </FacebookShareButton>

                <FacebookShareCount
                    url={url}>
                    {count => count}
                </FacebookShareCount>
            </div>
        );
      }
}

export default FacebookButton
