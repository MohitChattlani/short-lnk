import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state={
      url:"",
      isOpen:false,
      error:""
    };
  }
  onchange(e){
    this.setState({
      url:e.target.value
    });
  }
  onsubmit(e){
    e.preventDefault();
    const {url}=this.state;
    Meteor.call('links.insert',url,(err,res)=>{
      if (!err)
      {
        this.handlemodalClose();
      }
      else {
        this.setState({error:err.reason})
      }
    });
  }
  handlemodalClose(){
    this.setState({
      url:"",
      isOpen:false,
      error:""
    });
  }
  render(){
    return (
      <div>
        <button className="button" onClick={()=>{
          this.setState({
            isOpen:true
          });
        }}>+ Add Link</button>
        <Modal isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={()=>this.refs.url.focus()}
          onRequestClose={this.handlemodalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
          >
          <h1>Enter link:</h1>
          {this.state.error ? <p>{this.state.error}</p>:null}
          <form className="boxed-view__form" onSubmit={this.onsubmit.bind(this)}>
            <input type="text" ref="url"  placeholder="URL"
              value={this.state.url}
            onChange={this.onchange.bind(this)}/>
            <button className="button">Enter link</button>
            <button type="button" className="button button--secondary" onClick={this.handlemodalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
