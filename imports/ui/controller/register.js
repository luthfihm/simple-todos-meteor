/**
 * Created by luthfi on 5/24/16.
 */
import '../template/register.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

if (Meteor.isClient) {
    Template.register.events({
        'submit form' : function (event) {
            event.preventDefault();
            var newUser = {
                username: event.target.username.value,
                password: event.target.password.value,
                email: event.target.email.value
            };
            Meteor.call('users.register', newUser, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    Router.go('login');
                }
            });
        }
    });
}