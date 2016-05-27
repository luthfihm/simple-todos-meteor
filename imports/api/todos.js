/**
 * Created by luthfi on 5/24/16.
 */
import { Meteor } from 'meteor/meteor';
import '../helper/helper.js';
if(Meteor.isServer){
    // server code goes here
    var module = 'todos';
    Meteor.methods({
        'todos.list': function (token, userId) {
            this.unblock();
            console.log("todos.list");
            var filter = {
                where: {userId: userId}
            };
            var apiUrl = baseApi + '/' + module + '?filter=' + JSON.stringify(filter);
            var response = Meteor.wrapAsync(apiCall)(apiUrl, "GET", {});
            return response;
        },
        'todos.post': function (token, todo) {
            this.unblock();
            console.log("todos.post");
            var apiUrl = baseApi + '/' + module + '?access_token=' + token;
            var response = Meteor.wrapAsync(apiCall)(apiUrl, "POST", {data: todo});
            return response;
        },
        'todos.delete': function (token, id) {
            this.unblock();
            console.log("todos.delete");
            var apiUrl = baseApi + '/' + module + '?access_token=' + token;
            var response = Meteor.wrapAsync(apiCall)(apiUrl + '/' + id, "DELETE", {});
            return response;
        },
        'todos.update': function (token, id, todo) {
            this.unblock();
            console.log("todos.update");
            var apiUrl = baseApi + '/' + module + '?access_token=' + token;
            var response = Meteor.wrapAsync(apiCall)(apiUrl + '/' + id, "PUT", {data: todo});
            return response;
        }
    });
}