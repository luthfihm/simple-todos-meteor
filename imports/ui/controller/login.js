/**
 * Created by luthfi on 5/24/16.
 */
import '../template/login.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

if (Meteor.isClient) {
    Template.login.events({
        'submit form' : function (event) {
            event.preventDefault();
            var credential = {
                username: event.target.username.value,
                password: event.target.password.value
            };
            Meteor.call('users.login', credential, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    setCookie('token',res.id,1);
                    setCookie('userId',res.userId,1);
                    window.location = '/todos';
                }
            });
        }
    });
}