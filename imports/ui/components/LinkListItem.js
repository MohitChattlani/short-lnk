import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinkListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      justcopied:false
    };
  }
  componentDidMount(){
    this.clipboard=new Clipboard(this.refs.copy);
    this.clipboard.on('success',()=>{
      this.setState({
        justcopied:true
      });
      setTimeout(()=>{
        this.setState({
          justcopied:false
        });
      },1000);
    }).on('error',()=>{
      alert("Couldn't copy. Manually copy it.");
    });
  }
  componentWillUnmount(){
    this.clipboard.destroy();
  }
  renderStats(){
    let visitMessage= this.props.visitedCount===1? 'visit':'visits';
    let visitedMessage=null;
    if (typeof this.props.lastVisitedAt==="number") {
      let linkmoment=moment(this.props.lastVisitedAt);
      visitedMessage=`(visited ${linkmoment.fromNow()})`;
    }
    return (
      <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    );
  }
  render(){
    return(
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shorturl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shorturl} target="_blank">Visit</a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shorturl}>
          {this.state.justcopied ? 'Copied':"Copy"}
        </button>
        <button className="button button--pill" onClick={()=>{
          Meteor.call("links.setVisiblity",this.props._id,!this.props.visible);
        }}>{this.props.visible ? "Hide":"Unhide"}</button>
      </div>
    );
  }
}

LinkListItem.propTypes={
  _id:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired,
  visible:PropTypes.bool.isRequired,
  visitedCount:PropTypes.number.isRequired,
  lastVisitedAt:PropTypes.number,
  shorturl:PropTypes.string.isRequired
};
