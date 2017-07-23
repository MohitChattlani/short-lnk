import {Meteor} from 'meteor/meteor';
import {History} from '/client/main';
import React from 'react';
import Linkslist from './Linkslist';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilter from './LinkListFilter';

export default class Link extends React.Component {
  componentWillMount(){
    if (!Meteor.userId())
    {
      History.replace('/');
    }
  }
  render(){
    return (
      <div>
        <PrivateHeader title="ShortLnk"/>
        <div className="page-content">
          <LinkListFilter/>
          <AddLink/>
          <Linkslist/>
        </div>
      </div>
    );
  }
}
