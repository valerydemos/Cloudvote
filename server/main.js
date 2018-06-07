import { Meteor } from 'meteor/meteor';

import '../imports/api/options.js';
import '../imports/api/questions.js';
import '../imports/api/answers.js';
import '../imports/api/appstatus.js';
import '../imports/api/clients.js';
import '../imports/data/DataSource.js';
import { Random } from 'meteor/random'


import { Answers } from '../imports/api/answers.js';
import { Clients } from '../imports/api/clients.js';

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.methods({
  'answer.submit'({ answerId, clientId }) {
    //Clients.insert({ clientId: clientId, voted: true });
    Clients.update(clientId,{answered: true});
    console.log('Answer for: ' + answerId);
    var answerScore = Answers.findOne(answerId).score;
    Answers.update({ _id: answerId }, { $inc: { score: 1 } });

    Tracker.flush();
  },
  'voting.start'({ reset }) {
    console.log('Im here');
    if (reset) {
      Clients.update({}, {$set: {answered: false}}, {multi: true});
    }
  }
});

