import '../imports/ui/body.js';

import { Random } from 'meteor/random'
import { Appstatus } from '/imports/api/appstatus.js';
import { Clients } from '/imports/api/clients.js';

var clientId;


Meteor.startup(() => {

  if (localStorage.getItem("clientId") == null) {
    //clientId = Random.id();
    clientId = Clients.insert({ active: true });
    localStorage.setItem("clientId", clientId);
    Session.set('clientId', localStorage.getItem("clientId"));
  }
  else {
    Session.set('clientId', localStorage.getItem("clientId"));
    clientId = localStorage.getItem("clientId");
    var client = Clients.findOne({ _id: clientId });
    if (client) {
      Clients.update(clientId, { $set: { active: true } })
    }
    else {
      clientId = Clients.insert({ active: true });
      localStorage.setItem("clientId", clientId);
      Session.set('clientId', localStorage.getItem("clientId"));
    }
  }
});
