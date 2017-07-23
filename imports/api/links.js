import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links=new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links',function(){
    return Links.find({userId:this.userId});
  });
}

//resource.action
Meteor.methods({
  'links.insert'(url){
    if (!this.userId)
    {
      throw new Meteor.Error(400,'Not logged in');
    }
    new SimpleSchema({
      url:{
        type:String,
        label:'Your link',
        regEx:SimpleSchema.RegEx.Url
      }
    }).validate({url});
    Links.insert({_id:shortid.generate(),url,userId:Meteor.userId(),visible:true
    ,visitedCount:0,lastVisitedAt:null});
  },
  'links.setVisiblity'(_id,visible){
    if (!this.userId) {
      throw new Meteor.Error(400,"Not logged in");
    }
    new SimpleSchema({
      _id:{
        type:String,
        min:1
      },
      visible:{
        type:Boolean
      }
    }).validate({_id,visible});
    Links.update({_id,userId:this.userId},{$set:{visible}});
  },
  'links.updatevisited'(_id){
    new SimpleSchema({
      _id:{
        type:String,
        min:1
      }
    }).validate({_id});
    Links.update({_id},{$set:{lastVisitedAt:new Date().getTime()},$inc:{visitedCount:1}})
  }
});

/*Meteor.methods({
  greetUser(name){
    console.log("Running from greetUser");
    if (!name) {
      throw new Meteor.Error('invalid argument','name is a required argument');
    }
    return `hello ${name}!`;
  },
  addNumbers(a,b){
    console.log("addnumvbers called");
    if (typeof a !=="number" || typeof b !=="number") {
      throw new Meteor.Error('invalid args','Arguments must be numbers');
    }
    return a+b;
  }
});
*/
