/**
 * Created by luthfi on 5/24/16.
 */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
if (Meteor.isServer) {
    baseApi = 'http://p.akhfa.me:3002/api';
    apiCall = function (apiUrl, method, options, callback) {
        // try…catch allows you to handle errors
        try {
            var response = HTTP.call(method, apiUrl, options).data;
            callback(null, response);
        } catch (error) {
            if (error.response) {
                var errorCode = error.response.data.code;
                var errorMessage = error.response.data.message;
            } else {
                var errorCode = 500;
                var errorMessage = 'Cannot access the API';
            }
            // Create an Error object and return it via callback
            var myError = new Meteor.Error(errorCode, errorMessage);
            callback(myError, null);
        }
    };
}