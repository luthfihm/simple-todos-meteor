/**
 * Created by luthfi on 5/24/16.
 */
import { Meteor } from 'meteor/meteor';
import '../helper/helper.js';

if (Meteor.isServer) {
    var module = 'users';
    var apiUrl = baseApi + '/' + module;
    Meteor.methods({
        'users.register' (newUser) {
            this.unblock();
            console.log("user.register");
            var response = Meteor.wrapAsync(apiCall)(apiUrl, "POST", {data: newUser});
            return response;
        },
        'users.login' (credential) {
            this.unblock();
            console.log("user.login");
            var response = Meteor.wrapAsync(apiCall)(apiUrl + '/login', "POST", {data: credential});
            return response;
        }
    });
}