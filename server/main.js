import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import './../imports/api/users';
import {Links} from './../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req,res,next)=>{
    //localhost:3000/abcdeggh
    const _id=req.url.slice(1);
    const link=Links.findOne({_id});
    if (link) {
      res.statusCode=302;
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.updatevisited',link._id);
    }
    else {
      next();
    }
  });
  /*WebApp.connectHandlers.use((req,res,next)=>{
    console.log("Running our middleware");
    console.log(req.url,req.method,req.headers,req.query);
    //res.statusCode=404;
    //res.setHeader('my-custom-header','Andrew');
    //res.write('<h1>Hello from middleware</h1>');
    //res.end();
    next();
  });
  */
});
