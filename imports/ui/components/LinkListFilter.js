import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';

export default class LinkListFilter extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showVisible:true
    }
  }
  componentDidMount(){
    this.visibletracker=Tracker.autorun(()=>{
      const visibility=Session.get('showVisible');
      this.setState({
        showVisible:visibility
      });
    });
  }
  componentWillUnmount(){
    this.visibletracker.stop();
  }
  render(){
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e)=>{
            Session.set('showVisible',!e.target.checked);
          }}/>
          Show Hidden links
        </label>
      </div>
    );
  }
}
