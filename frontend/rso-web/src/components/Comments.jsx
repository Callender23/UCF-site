import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import '../styles/Comments.scss'

 class Comments extends Component{

    constructor(props){
        super(props);
        this.state =
        {
        
            comments : [],
            user_id : this.props.user_id,
            pub_event_id : this.props.pub_event_id,
            event_type : this.props.event_type,
            inputValue : ''
        }
        this.getComments = this.getComments.bind(this)
        this.deleteButton = this.deleteButton.bind(this)
        this.buttonMashing = this.buttonMashing.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
      }
    componentDidMount(){
        this.getComments()
    }
  
    render(){
        return(
            <div id = "comment">
                <div>
                    {this.state.comments}  
                </div>
                <div className = "event-comment-commentbox">
                    <div>
                        <input type = "text" value = {this.state.inputValue} onChange={evt => this.updateInputValue(evt)} className = "event-comment-text"></input>
                        {/* <button onClick = {this.buttonMashing} className = "comment-add"> Add Comment </button> */}
                        <button class="btn btn-primary" type="submit"  onClick = {this.buttonMashing} className = "event-comment-submit"  > Add Comment </button>
                    </div>
                </div>
            </div>
        )
    }

    getComments(){
        var url = ""
        if(this.state.event_type === 1){
          console.log('this is a public event dude!!!')
          url = "https://groupoffive.azurewebsites.net/publiccomment/"
        }
          

        else if(this.state.event_type === 2){
          console.log("this is a private event DOOOD!!!")
          url = "https://groupoffive.azurewebsites.net/privatecomment/"
        }

        else if(this.state.event_type === 3){
          console.log("this has to be a RSO EVENT DAAAAD!")
          url = "https://groupoffive.azurewebsites.net/rsocomments/"
        }
         

        url = url.concat(this.state.pub_event_id);
        var rows = []
    
        fetch(url,{
        method: 'GET',
        headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        })
        .then(response => response.json())
        .then((result) => {

        for (let i = 0; i < result.length; i++)
        {
            if(this.state.event_type === 1) {
            rows.push(
                <ListGroup className = "event-comment">
                    <ListGroup.Item className = "event-comment-list">
                    <div className = "event-comment-content">
                        {result[i].text}
                    </div>
                    <div className = 'event-comment-buttons'>
                       <div className = "event-comment-delete">
                          {this.deleteButton(result[i].user_id, result[i].pub_comm_id)}
                       </div>
                       <div className = "event-comment-edit">
                         {this.editComment}
                       </div>
                    </div>
                    </ListGroup.Item>  
                </ListGroup>
             )
            }
            if(this.state.event_type === 2) {
              rows.push(
                  <ListGroup className = "event-comment">
                      <ListGroup.Item className = "event-comment-list">
                      <div className = "event-comment-content">
                          {result[i].text}
                      </div>
                      <div className = 'event-comment-buttons'>
                         <div className = "event-comment-delete">
                            {this.deleteButton(result[i].user_id, result[i].priv_comm_id)}
                         </div>
                         <div className = "event-comment-edit">
                           {this.editComment}
                         </div>
                      </div>
                      </ListGroup.Item>  
                  </ListGroup>
               )
              }

              if(this.state.event_type === 3) {
                rows.push(
                    <ListGroup className = "event-comment">
                        <ListGroup.Item className = "event-comment-list">
                        <div className = "event-comment-content">
                            {result[i].text}
                        </div>
                        <div className = 'event-comment-buttons'>
                           <div className = "event-comment-delete">
                              {this.deleteButton(result[i].user_id, result[i].rso_comm_id)}
                           </div>
                           <div className = "event-comment-edit">
                             {this.editComment}
                           </div>
                        </div>
                        </ListGroup.Item>  
                    </ListGroup>
                 )
                }
           
      }
      this.setState({comments : rows});
      })
      .catch(error => {
        console.log('Error',error);
      })
    
       
      }

      deleteButton(commenter, commentId){
        if( this.state.user_id === commenter ){
          //return  <Button variant = "danger" block size = "sm" onClick = {this.deleteComment.bind(this, commentId)}> X </Button>
          return <div onClick = {this.deleteComment.bind(this, commentId) } className = "comments-delete">Delete</div>
        
        }
      }  

      buttonMashing(){
          var url = ""
          
          if(this.state.event_type === 1)
            url = "https://groupoffive.azurewebsites.net/publiccomment/"
          
          else if(this.state.event_type === 2)
            url = "https://groupoffive.azurewebsites.net/privatecomment/"

          else if(this.state.event_type === 3){
             url = "https://groupoffive.azurewebsites.net/rsocomments/"
          }

          url = url.concat(this.state.pub_event_id)
          console.log(url)

          fetch(url,{
            method: 'POST',
            headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
              user_id : this.state.user_id,
              text : this.state.inputValue, 
              rating : "3"
            })
          }).then(response => console.log(response))
          .catch(error => {
            console.log('Error', error);
          });
          //window.location.reload(true);
      }

      updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }

      deleteComment(id){
           
            
            //var url = "https://groupoffive.azurewebsites.net/publiccomment/"
            var url = ""

            if(this.state.event_type === 1){
              //console.log('this is a public event dude!!!')
              url = "https://groupoffive.azurewebsites.net/publiccomment/"
              url = url.concat(id)

              
              fetch(url,{
                method: 'DELETE',
                headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                })
                .then(response => response.json())
                .then((result) => {
        
                    console.log("deleting")
              })
              .catch(error => {
                console.log('Error',error);
              })
            }
              
    
            else if(this.state.event_type === 2){
              console.log("WARNING TRYING TO DELETE A PRIVATE COMMMENT")
              url = "https://groupoffive.azurewebsites.net/privatecomment/"
              url = url.concat(id)

              
              fetch(url,{
                method: 'DELETE',
                headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({
                  user_id : this.state.user_id
                })
                })
                .then(response => response.json())
                .then((result) => {
        
                    console.log("deleting")
              })
              .catch(error => {
                console.log('Error',error);
              })
              
            }
    
            else if(this.state.event_type === 3){
              console.log("WARNING TRYING TO DELETE AN RSO COMMENT")
            
              url = "https://groupoffive.azurewebsites.net/rsocomments/"
              url = url.concat(id)
              console.log(url)

              fetch(url,{
                method: 'DELETE',
                headers: {'Accept' : 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({
                  user_id : this.state.user_id
                })
                })
                .then(response => response.json())
                .then((result) => {
        
                    console.log("deleting")
              })
              .catch(error => {
                console.log('Error',error);
              })
            }
  
        }

        editComment(){
          if( 1 === 1)
            return <div> Edit </div>
        }

              
           
      
}

export default Comments