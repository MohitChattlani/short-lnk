import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Links} from '../../api/links';
import {Meteor} from 'meteor/meteor';
import LinkListItem from './LinkListItem';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class Linkslist extends React.Component {
  constructor(props){
    super(props);
    this.state={
      links:[]
    };
  }
  componentDidMount()
  {
    console.log("componentDidMount called");
    this.linkstracker=Tracker.autorun(()=>{
      Meteor.subscribe('links');
      let links=Links.find({visible:Session.get('showVisible')}).fetch();
      this.setState({links});
    });
  }
  componentWillUnmount()
  {
    console.log("componentWillUnmount called");
    this.linkstracker.stop();
  }
  renderLinksListItems()
  {
    if (this.state.links.length===0) {
      return(
        <div className="item">
          <p className="item__statusmessage">No links can be found.</p>
        </div>
      );
    }
    else {
      return this.state.links.map((link)=>{
        const shorturl=Meteor.absoluteUrl(link._id);
        return <LinkListItem key={link._id} shorturl={shorturl} {...link}/>;
      });
    }
  }
  render(){
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
